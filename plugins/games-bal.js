module.exports = {
    commands: ['bal','balance','balence'],
    help: ['bal'],
    tag: "games",
    isOwner: false,
    onlyGp: false,
    onlyDm: false,
    isAdmin: false,
    isAdminOrDm: false,
    handler: async function ({ m, sock }, lang, text) {
        let vs='Casper Bot'
        const l =await  global.lang.q
        const who= m.sender
        await m.reply(`╭━〔 🔖 *BALANCE* 〕━⬣
┃ *${await l("user",lang)}*
┃ ${m.name}
┃┈┈┈┈┈┈┈┈┈┈┈┈
┃ *${await global.db.data.users[who].money} ${await l('diamond',lang)}* 💎
┃ *${await global.db.data.users[who].coin} ${await l('coin',lang)}* 🪙
┃ *${await global.db.data.users[who].doller} ${await l('doller',lang)}* 💵
┃ *${await global.db.data.users[who].diamond} ${await l('diamond',lang)}* 💰
┃ *${await global.db.data.users[who].dmToken} ${await l('dmToken',lang)}* 🔖
╰━〔 *𓃠 ${vs}* 〕━━━⬣`)
    }
};