module.exports = {
    commands: ['ai', 'ia', 'chatgpt', 'gpt'],
    help: ['ai'],
    tag: "ai",
    isOwner: false,
    onlyGp: false,
    onlyDm: false,
    isAdmin: false,
    isAdminOrDm: false,
    handler: async function ({ m, sock }, lang, text) {
        if (!text) {

           await m.replyWithTyping(await global.lang.q('aiH',await lang,await m))
        } else {
            sock.sendPresenceUpdate('composing', m.chat)
      let qn=await text+await `\n\n[Name : ${m.name.replace(`\n`,"")} , language code: ${global.db.data.users[m.sender].lang}, Developer/creator: Sriji , Created Company: Casper ltd]`
    const response = await fetch(`https://hercai.onrender.com/v2/hercai?question=${qn}`);
    let res = await response.json()
    let ans = await res.reply.replace("Hercai","Casper-Bot 💘 [API]").replace("OpenAI","SrijiSer").replace("@User",'@' + m.sender.split('@')[0]);
    await sock.sendPresenceUpdate('paused', m.chat)
    // await sock.sendMessage(m.chat, {text :ans,mentions:[m.sender] } , { quoted: m.mmm })
    await m.reply(ans)
        }
}
    };