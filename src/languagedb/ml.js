const { emoji } = require('../../config');
module.exports = {
    languageCode: "en",
    hello: `ഹലോ`,
    ping: `♠️ *Ping :* `,
    user: `ഉപയോക്താവ്`,
    welcome: `സാഹസികത ആരംഭിക്കാൻ പോകുന്നു`,
    regH: `*തെറ്റായ കമാൻഡ് ഉപയോഗം* ...\n\n_ഉദാഹരണം:_\n\t\t_/reg <പേര്> <പ്രായം> <ലിംഗഭേദം>_\n\t\t_/reg casper-19-F_\n\nലിംഗഭേദം : \n\t\t\tM - ആൺ\n\t\t\tF - പെൺ\n\t\t\tN - നോൺ-ബൈനറി`,
    regD: `ഉപയോക്താവ് രജിസ്ട്രേഷൻ പൂർത്തിയായി ${emoji.check}`,
    languageSet: `ഭാഷ സജ്ജീകരിച്ചു : <?yourlang> ${emoji.check}`,
    hhelp: `കമാൻഡുകൾ ലിസ്റ്റുചെയ്യുക`,
    hping: `സ്പീഡ് ടെസ്റ്റ്`,
    hlang: `ഭാഷ സജ്ജീകരിക്കാൻ`,
    hreg: `രജിസ്റ്റർ ചെയ്യാൻ`,
    youwon: `അഭിനന്ദനങ്ങൾ! നിങ്ങൾ വിജയിച്ചു ${emoji.hooray}`,
    youloss: `ക്ഷമിക്കണം, നിങ്ങൾക്ക് നഷ്ടമായി...${emoji.sed}`,
    coins: `നാണയങ്ങൾ!`,
    slot: `സ്ലോട്ട് `,
    roll: `പകിട എറിയുക`,
    diamond: `വജ്രം`,
    money: `പണം`,
    coin: `നാണയം`,
    doller: `ഡോളർ`,
    dmToken: `ഡിഎം ടോക്കൺ`,
    balH: `ബാലൻസ് പ്രദർശിപ്പിക്കാൻ`,
    games: `ഗെയിമുകൾ`,
    main: `പ്രധാന`,
    tossW: `നിങ്ങൾക്ക് നമ്പർ മാത്രം നൽകാൻ കഴിയും (1 മുതൽ 6 വരെ മാത്രം)...🐱\n\n_▶️ ഉദാഹരണം : */toss ${Math.floor(Math.random() * 6) + 1}*_`,
    youChoose: `നിങ്ങൾ തിരഞ്ഞെടുക്കുക : `,
    result: `ഫലം : `,
    cooldown: async function (em) {
        return `${em.command} ന്റെ കൂൾഡൗൺ അവസാനിക്കുന്നത് വരെ കാത്തിരിക്കണം: ${new Date - em.lastSlot}`
    },
    notext: async function (em, type) {
        return `*ഏതെങ്കിലും ${type.toUpperCase() == "N" ? "സംഖ്യ" : "വാചകം"} നൽകുക* 🐱\n_ഉദാഹരണം:_\n\t\t${em.usedPrefix}${em.command} ${type == "N" ? "69" : "ചോദ്യം"}`
    },
    enter: async function (em) {
        return `*നിങ്ങൾ ${em.command.toUpperCase()} ഗെയിമിൽ വിജയകരമായി പ്രവേശിച്ചു*`
    },
    ing: async function (em) {
        return `*നിങ്ങളുടെ തുക ${em.command.toLowerCase()} ചെയ്യുന്നു...*`
    },
    notenough: async function (em) {
        return `😺 ${em.command.toUpperCase()} ചെയ്യാൻ നിങ്ങൾക്ക് പണം ഇല്ല.\nനിങ്ങളുടെ ബാലൻസ് പരിശോധിക്കാൻ /bal ഉപയോഗിക്കുക`
    },
    claimed: async function (em, tipo) {
        return `╭━━🎁━🎁━🎁━━⬣
┃ ✨ പുരസ്കാരം ലഭിച്ചു!
┃ ✨ നിങ്ങൾക്ക് ഒരു സമ്മാനം ലഭിച്ചു!
┃ - പ്രീമിയം പുരസ്കാരം: *${em.premium ? "🎟️" : "❌"}*
┃ ${tipo ? tipo : "സ്വീകർത്താവ് " + em.name}
╰━━🎁━🎁━🎁━━⬣
      
      🎟️ 𝗣 𝗥 𝗘 𝗠 𝗜 𝗨 𝗠 ⇢ ${em.premium ? "✅" : "❌"}
      - CASPER`
    },
    cantclaim: async function (em, tipo) {
        return `നിങ്ങൾക്ക് ഇപ്പോൾ ${em.command} ക്ലെയിം ചെയ്യാൻ കഴിയില്ല. ${tipo} വരെ കാത്തിരിക്കേണ്ടതുണ്ട്.`
    },
    daily: "ദൈനംദിന പുരസ്കാരം ക്ലെയിം ചെയ്യുന്നതിന്",
    weekly: "വാരാന്ത്യ പുരസ്കാരം ക്ലെയിം ചെയ്യുന്നതിന്",
    monthly: "മാസത്തിലെ പുരസ്കാരം ക്ലെയിം ചെയ്യുന്നതിന്",
    aiH: async function (em) {
        return `ഹലോ @${em.name} ദയവായി എനിക്ക് സഹായിക്കാൻ ഏതെങ്കിലും വാചകം നൽകുക...\n\n_ഞാൻ ഒരു ഭാഷാ മോഡൽ ആയി`
    }
};      
