module.exports = {
    commands: ['bot','simsimi','chatbot'],
    help: ['bot'],
    tag: "ai",
    isOwner: false,
    onlyGp: false,
    onlyDm: false,
    isAdmin: false,
    isAdminOrDm: false,
    handler: async function ({ m, sock }, lang, text) {
        if (!text) {
           await m.replyWithTyping(`Hello @${m.name} Please Enter Any Text So That I Can Help You,...\n\n_As An Ai Language Model, Created By Sriji, I Can Help You With Any Kind Of Appropriate Topic_`)
        } else {
            sock.sendPresenceUpdate('composing', m.chat)
    const response = await fetch(`https://api.simsimi.net/v2/?text=${text}&lc=en`);
    let res = await response.json()
    if(await res?.success){
    await sock.sendPresenceUpdate('paused', m.chat)
    m.reply(res.success)
    }else{
    await sock.sendPresenceUpdate('paused', m.chat)
    m.reply(res)
    }

    // await sock.sendMessage(m.chat, {text :ans,mentions:[m.sender] } , { quoted: m.mmm })
    
        }
}
    };