module.exports = {
    commands: ['lang','language'],
    help:['lang'],
    tag:"main",
    isOwner: false,
    onlyGp: false,
    onlyDm: false,
    isAdmin: false,
    isAdminOrDm: false,
    handler: async function ({ m , sock }, lang, text) {
        if(!text ||  (text !== "en" && text!=="es"&&text!=='fr'&&text!=='ml')){
            m.reply(await global.lang.H(m))
        }else{
            await sock.presenceSubscribe(m.sender)
            await sock.sendPresenceUpdate('composing', m.sender)        
            let txxt=await global.lang.q("languageSet",text)
            global.db.data.users[m.sender].lang= await text
            await sock.sendPresenceUpdate('paused',m.sender)
            await m.reply(txxt.replace("<?yourlang>",text).replace("en","_English_").replace("ml","_മലയാളം_").replace("es"," _Español_ ").replace('fr',"_Français_"));
        }
    },
};
