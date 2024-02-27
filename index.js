const { DisconnectReason, useMultiFileAuthState, downloadMediaMessage } = require("@whiskeysockets/baileys");
const { makeWASocket } = require("@whiskeysockets/baileys");
const fs = require('fs');
const path = require('path');
const tmpDir = './tmp';
const colors = require('colors');
const { tempRemain, owner, prefix, emoji } = require('./config.js');
const { isGroup } = require("./plugins/ping.js");
const { Sticker, createSticker, StickerTypes } = require('wa-sticker-formatter')
const logger = require('pino')
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);
const dbPath = './database.json';
const enLanguage = require('./src/languagedb/en.js');
const mlLanguage = require('./src/languagedb/ml.js');
const esLanguage = require('./src/languagedb/es.js');
const frLanguage = require('./src/languagedb/fr.js');
if (!fs.existsSync(dbPath)) {
    // If it doesn't exist, create an initial empty structure
    const initialData = {
        users: {},
        groups: {},
        bot_settings: {},
        rooms: {}
    };

    fs.writeFileSync(dbPath, JSON.stringify(initialData, null, 2), 'utf8');
}

const data = require(dbPath);

async function saveData() {
    await fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), (err) => {
        if (err) {
            console.error('Error saving data:', err);
        }
    });
}


global.lang = {
    H: async function (m) {
        const user = await global.db.data.users[m.sender]
        let selected = await user.lang || 'en'
        return `🌐 *Set Your Language Using*\n\t_/lang en    - English_ ${await selected == 'en' ? '☑️' : ''}\n\t_/lang ml    - മലയാളം_ ${await selected == 'es' ? '☑️' : ''}\n\t_/lang es    - Español_ ${await selected == 'es' ? '☑️' : ''}\n\t_/lang fr    - Français_ ${await selected == 'fr' ? '☑️' : ''}`
    }
    ,
    q: async function (text, languageCode, em, type = '') {
        const lc = languageCode || "en"
        switch (lc) {
            case 'en':
                return typeof enLanguage[text] === 'function' ? enLanguage[text](em, type) : enLanguage[text];
                break;
            case 'ml':
                return typeof mlLanguage[text] === 'function' ? mlLanguage[text](em, type) : mlLanguage[text];
                break;
            case 'es':
                return typeof esLanguage[text] === 'function' ? esLanguage[text](em, type) : esLanguage[text];
                break;
            case 'fr':
                return typeof frLanguage[text] === 'function' ? frLanguage[text](em, type) : frLanguage[text];
                break;
            default:
                return typeof enLanguage[text] === 'function' ? enLanguage[text](em, type) : enLanguage[text];
                break;
        }
    }
};
function scanInDb(input) {
    const languages = [enLanguage, esLanguage];


    for (const lang of languages) {
        for (const key in lang.questions) {
            if (lang.questions[key] === input) {
                return key;
            }
        }
    }

    return false;
}

try {
    global.db = {
        data: data,
        // Rest of your database functions here
    };
} catch (error) {
    console.log(error);
}



async function connectToWhatsapp() {
    const { state, saveCreds } = await useMultiFileAuthState('SRIJI-SESSIONS')

    const sock = makeWASocket({
        // can provide additional config here
        auth: state,
        printQRInTerminal: true,
        // logger: P({ level: 'debug' }),      //uncomment pino require if you wanna use this logger from top
    })

    function delay(ms) {
        return new Promise(resolve => {
            setTimeout(resolve, ms);
        });
    }
    //tmp deletion
    async function deleteFilesInTmpDir() {
        fs.readdir(tmpDir, (err, files) => {
            if (err) {
                console.error('Error reading directory:', err);
                return;
            }

            const currentTime = new Date().getTime();

            files.forEach(file => {
                const filePath = path.join(tmpDir, file);

                fs.stat(filePath, (err, stats) => {
                    if (err) {
                        console.error('Error getting file stats:', err);
                        return;
                    }

                    const fileCreationTime = stats.birthtime.getTime();
                    const elapsedTime = currentTime - fileCreationTime;

                    if (elapsedTime >= tempRemain * 60 * 1000) { // 3 minutes in milliseconds
                        fs.unlink(filePath, err => {
                            if (err) {
                                console.error('Error deleting file:'.bgRed, err);
                            } else {
                                console.log(`Auto Clear | Deleted ${file}`.cyan);
                            }
                        });
                    }
                });
            });
        });
    }
    //tmp del
    setInterval(deleteFilesInTmpDir, 60 * 1000);
    sock.ev.on("connection.update", async (update) => {
        const { qr, connection, lastDisconnect } = update || {};

        if (qr) {
            console.log("Qr Code Generated...")
            console.log(qr)
        }

        if (connection == "close") {
            const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;
            if (shouldReconnect) {
                connectToWhatsapp()
            } else {
                console.log("Connection Closed, Your Now Logged Out")
            }
        }

    });
    // to save the creds in ./sriji-sessions
    sock.ev.on('creds.update', saveCreds)
    //listen to calls
    sock.ev.on('call', (call) => {
        if (call[0]?.status == "offer") {
            console.log(call)
        }
    })


    //listener for 'messages.upsert': { messages: WAMessage[], type: MessageUpsertType }
    sock.ev.on('messages.upsert', ({ messages }) => {
        // console.log(messages[0])
        const m = {
            botname: "CASPER-RELOADED",
            mmm: messages[0],
            lang: global?.db?.data?.users[messages[0]?.key?.remoteJid?.endsWith("@s.whatsapp.net") ? messages[0]?.key?.remoteJid : messages[0]?.key?.participant]?.lang || "en",
            name: messages[0]?.pushName?.replace(/\n/g, "")?.trim() || "",
            chat: messages[0]?.key?.remoteJid || '',
            // lang: global?.db?.data?.users[messages[0]?.key?.remoteJid?.endsWith("@s.whatsapp.net") ? messages[0]?.key?.remoteJid : messages[0]?.key?.participant]?.lang || "en",
            sender: messages[0]?.key?.remoteJid?.endsWith("@s.whatsapp.net") ? messages[0]?.key?.remoteJid : messages[0]?.key?.participant,
            isGroup: messages[0]?.key?.remoteJid?.endsWith("@g.us") ? true : false,
            isDm: messages[0]?.key?.remoteJid?.endsWith("@s.whatsapp.net") ? true : false,
            text: messages[0]?.message?.conversation || messages[0]?.message?.extendedTextMessage?.text,
            key: messages[0]?.key?.id || '',
            regStatus: global.db.data.users[messages[0]?.key?.remoteJid]?.regStatus ? (+new Date - global.db.data.users[messages[0]?.key?.remoteJid].regStatus < 60 * 1000) ? true : false : false,
            usedPrefix: prefix.includes(messages[0]?.message?.conversation[0]) ? messages[0]?.message?.conversation[0] : '',
            isOwner: owner.includes(messages[0]?.key?.remoteJid?.endsWith("@s.whatsapp.net") ? messages[0]?.key?.remoteJid : messages[0]?.key?.participant) ? true : false,
            fromMe: messages[0]?.key?.fromMe,
            command: (messages[0]?.message?.conversation || messages[0]?.message?.extendedTextMessage?.text)
                ?.split(' ')[0]
                ?.replace(prefix.includes(messages[0]?.message?.conversation[0]) ? messages[0]?.message?.conversation[0] : '', ''),
            quoted: {
                log: messages[0].message?.extendedTextMessage?.contextInfo || messages[0].message?.extendedTextMessage?.contextInfo,
                text: messages[0].message?.extendedTextMessage?.contextInfo?.quotedMessage?.conversation || messages[0].message?.extendedTextMessage?.contextInfo?.text || "",
                sender: messages[0].message?.extendedTextMessage?.contextInfo?.participant || "",
                tagged: messages[0].message?.extendedTextMessage?.contextInfo?.mentionedJid || "",
            },
            replyingTo: messages[0]?.key?.remoteJid?.endsWith("@s.whatsapp.net") ? messages[0]?.message?.extendedTextMessage?.contextInfo?.quotedMessage?.conversation || messages[0].message?.extendedTextMessage?.contextInfo?.text || global?.db?.data?.users[messages[0]?.key?.remoteJid]?.lastReply || "" : messages[0].message?.extendedTextMessage?.contextInfo?.quotedMessage?.conversation || messages[0].message?.extendedTextMessage?.contextInfo.text || false,
            sendSticker: async function (path) {
                const sticker = new Sticker(path, {
                    pack: 'Made With Casper Bot', // The pack name
                    author: 'insta : sriji_ser', // The author name
                    type: 'crop', // The sticker type
                    categories: ['🤩', '🎉'], // The sticker category
                    id: '12345', // The sticker id
                    quality: 100, // The quality of the output file
                    background: '#000000' // The sticker background color (only for full stickers)
                })
                const buffer = await sticker.toBuffer() // convert to buffer
                // or save to file
                // await sticker.toFile('sticker.webp')

                // or get Baileys-MD Compatible Object
                sock.sendMessage(messages[0]?.key?.remoteJid, await sticker.toMessage())
            },
            react: async function (reac) {
                await sock.sendMessage(messages[0]?.key?.remoteJid, {
                    react: {
                        text: reac.trim() || '', // use an empty string to remove the reaction
                        key: messages[0].key
                    }
                })
            },
            reply: async function (tex) {
                await sock.sendMessage(messages[0]?.key?.remoteJid, { text: tex.trim() }, { quoted: messages[0] })
            },
            replyWithTyping: async function (tex) {
                await sock.presenceSubscribe(messages[0]?.key?.remoteJid)
                await delay(500)

                await sock.sendPresenceUpdate('composing', messages[0]?.key?.remoteJid)
                await delay(2000)

                await sock.sendPresenceUpdate('paused', messages[0]?.key?.remoteJid)

                sock.sendMessage(this.chat, { text: tex.trim() }, { quoted: messages[0] })
            }

        };
        async function autosticker(mesg) {

            if (!mesg.message) return // if there is no text or media message
            const messageType = Object.keys(mesg.message)[0]// get what type of message it is -- text, image, video
            // if the message is an image
            if (messageType === 'imageMessage' || messageType === 'documentMessage' || messageType === 'videoMessage') {
                // download the message
                const buffer = await downloadMediaMessage(
                    mesg,
                    'buffer',
                    {},
                    {
                        logger,
                        reuploadRequest: sock.updateMediaMessage
                    }
                )
                await m.sendSticker(buffer)
                console.log(`Sticker Sent To ${m.sender}`.bgCyan)
            }
        }
        autosticker(messages[0])
        async function isAdm(idgp, member) {
            try {
                const groupMetadata = await sock.groupMetadata(idgp);
                const targetParticipant = groupMetadata.participants.find(participant => participant.id === member);
                if (idgp.endsWith("g.us")) {
                    // Check if the participant is an admin with 'superadmin' role or 'admin
                    // console.log(groupMetadata)
                    const isSuperAdmin = targetParticipant?.admin == 'superadmin' || targetParticipant?.admin == 'admin' ? true : false;
                    return isSuperAdmin;
                } else {
                    return false
                };
            } catch (error) {
                console.error("Error fetching group metadata:", error);
            }
        }



        // if (global?.db?.data?.users[m.sender]) {
        //     console.log(messages[0])

        // };


        async function handleNewRegistration(m) {
            if (m.isDm) {
                if (!(global.db.data?.users[m.sender])) {
                    global.db.data.users[m.sender] = {};
                    if (m.isDm) {
                        try {
                            let gg = await global.lang.H(m)
                            m.reply(gg)
                        } catch (error) {
                            console.error("Error sending reply:", error);
                        }
                    }
                }
                const user = global?.db?.data?.users[m.sender];

                if (!user?.name) {
                    user.name = await m.name;
                }
                if (!user?.weekly) {
                    user.weekly =0;
                }
                if (!user?.monthly) {
                    user.monthly=0;
                }
                if (!user?.daily) {
                    user.daily=0;
                }
                if (!user?.lang) {
                    user.lang = 'en';
                }
                if (!user?.money) {
                    user.money = 0;
                }
                if (!user?.premium) {
                    user.premium = false;
                }
                if (!user?.coin) {
                    user.coin = 0;
                }
                if (!user?.doller) {
                    user.doller = 0;
                }
                if (!user?.diamond) {
                    user.diamond = 0;
                }
                if (!user?.dmToken) {
                    user.dmToken = 0;
                }
            } else if (m.isGroup) {
                if (!(await global.db.data?.groups[m.chat])) {
                    global.db.data.groups[m.chat] = {};
                }
                const group = await global.db.data.groups[m.chats]
                if (!await group?.antiLink) {
                    global.db.data.groups[m.chat].antiLink= false;
                }
                if (!await group?.anttBadWord) {
                    global.db.data.groups[m.chat].antiBadWord = false;
                }
                if (!await group?.bannedGuys) {
                    global.db.data.groups[m.chat].bannedGuys = [];
                }
            }
        }



        // You can call the async function like this:
        // handleUserRegistration(m);
        handleNewRegistration(m)

        if (m.isDm) {
            if (m.fromMe) {
                if (scanInDb(m.text)) {
                    global.db.data.users[m.sender].lastReply = m.text;
                    console.log(m.text.cyan)
                }

            } else {
                global.db.data.users[m.sender].lastMessage = m.text;
            }
        }
        //plugins start here  
        const pluginsDirectory = './plugins';


        // Function to load and execute plugins
        async function loadPlugins() {
            fs.readdirSync(pluginsDirectory).forEach((file) => {
                // Check if the file is a JavaScript file
                if (file.endsWith('.js')) {
                    const pluginPath = path.join(__dirname, pluginsDirectory, file);

                    try {
                        const plugin = require(pluginPath);

                        // Check if the plugin exports commands and a handler function
                        if (Array.isArray(plugin.commands) && typeof plugin.handler === 'function') {
                            const commands = plugin.commands.map((cmd) => cmd.toLowerCase());

                            // Check if the received message text matches any of the plugin's commands
                            if (commands.includes(m?.command?.toLowerCase()) && (m.isGroup ? m.usedPrefix : true)) {
                                if (!global?.db?.data?.users[m.sender]?.lang) {
                                    global.db.data.users[m.sender].lang = 'en'

                                } else {
                                    if ((m.fromMe ? messages[0]?.message?.conversation ? true : false : true) &&
                                        (plugin.isOwner ? m.isOwner : true) &&
                                        (plugin.onlyGp ? m.isGroup : true) &&
                                        (plugin.onlyDm ? !m.isGroup : true) &&
                                        (plugin.isAdmin ? m.isGroup ? isAdm(m.chat, m.sender) : false : true) &&
                                        (plugin.isAdminOrDm ? m.isGroup ? isAdm(m.chat, m.sender) : true : true)
                                    ) {
                                        const text = m.text.replace(m.usedPrefix, "").replace(m.command, "").trim()
                                        const lang = global.db.data.users[m.sender].lang

                                        plugin.handler({ m, sock }, lang, text, isAdm); // Call the plugin's handler function

                                    } else if ((m.fromMe ? messages[0]?.message?.conversation ? false : true : true)) {
                                        console.log(m.text)
                                    } else {
                                        m.reply("_You Dont Have Permission To Use This Command_")
                                    };
                                    if (!m.fromMe) {
                                        console.log(`Loaded plugin: ${file}`);
                                    }
                                }
                            }
                        }
                    } catch (error) {
                        console.error(`Error loading plugin ${file}: ${error.message}`);
                    } finally {
                        saveData()
                    }
                }
            });
        }

        // Call the function to load plugins when your bot starts
        loadPlugins();
        //plugins end

    });



}

connectToWhatsapp();
