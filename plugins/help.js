const { emoji } = require("../config")

module.exports = {
    commands: ['help', 'commands', 'h'],
    help: ['help'],
    tag: "main",
    isOwner: false,
    onlyGp: false,
    onlyDm: false,
    isAdmin: false,
    isAdminOrDm: false,
    diamond:"Diamond",
    handler: async function ({ m, sock }, lang, text) {
        await sock.presenceSubscribe(m.sender)
        await sock.sendPresenceUpdate('composing', m.sender)
        await m.react(`${emoji.classy1}`)
        let usedPrefix=await m.usedPrefix
        const h2=await `🛡️〓〓🛡️♚ *CASPER BOT* ♔🛡️〓〓🛡️
┋ 🏰 *¡${await global.lang.q("hello",lang)}! ${await m.name}* 🏰
┋┅┅┅┅┅┅┅┅┅┅┅┅┅
┋ 🏞️ *¡${await global.lang.q("welcome",lang)}!*
┋┅┅┅┅┅┅┅┅┅┅┅┅┅


┋┅┅┅┅┅┅┅┅┅┅┅┅┅
┋ 🏰 *¡ ${await global.lang.q("main",lang)} !* 🏰
┋┅┅┅┅┅┅┅┅┅┅┅┅┅
┋➥ ❖⃟⚔ *${usedPrefix}help* -${await global.lang.q("hhelp",lang)}
┋➥ ❖⃟⚔ *${usedPrefix}ping* -${await global.lang.q("hping",lang)}
┋➥ ❖⃟⚔ *${usedPrefix}lang* -${await global.lang.q("hlang",lang)}
┋➥ ❖⃟⚔ *${usedPrefix}reg*  -${await global.lang.q("hreg",lang)}
┋┅┅┅┅┅┅┅┅┅┅┅┅┅


┋┅┅┅┅┅┅┅┅┅┅┅┅┅
┋ 🏰 *¡ ${await global.lang.q("games",lang)} !* 🏰
┋┅┅┅┅┅┅┅┅┅┅┅┅┅
┋➥ ❖⃟⚔ *${usedPrefix}bal* -${await global.lang.q("balH",lang)}
┋➥ ❖⃟⚔ *${usedPrefix}slot* -${await global.lang.q("slot",lang)}
┋➥ ❖⃟⚔ *${usedPrefix}dice* -${await global.lang.q("roll",lang)}
┋➥ ❖⃟⚔ *${usedPrefix}daily* -${await global.lang.q("daily",lang)}
┋➥ ❖⃟⚔ *${usedPrefix}weekly* -${await global.lang.q("weekly",lang)}
┋➥ ❖⃟⚔ *${usedPrefix}monthly* -${await global.lang.q("monthly",lang)}
┋┅┅┅┅┅┅┅┅┅┅┅┅┅

 🛡️〓〓🛡️ *CASPER BOT* 🛡️〓〓🛡️`.trim()
        
        await sock.sendPresenceUpdate('paused', m.sender)
        await m.reply(await h2)
    }
};