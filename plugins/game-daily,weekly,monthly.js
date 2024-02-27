async function msToDuration(ms) {
    // Convert milliseconds to seconds
    const seconds = await Math.floor(ms / 1000);

    // Calculate the number of days, hours, minutes, and remaining seconds
    const days = await Math.floor(seconds / 86400); // 1 day = 86400 seconds
    const hours = await Math.floor((seconds % 86400) / 3600); // 1 hour = 3600 seconds
    const minutes = await Math.floor(((seconds % 86400) % 3600) / 60); // 1 minute = 60 seconds
    const remainingSeconds = await seconds % 60;

    // Create a string representation of the duration
    const durationString = `${await days} days, ${await hours} hours, ${await minutes} minutes, ${await remainingSeconds} seconds`;

    return durationString;
}
function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)]
}

module.exports = {
    commands: ['daily', 'weekly', 'monthly'],
    help: ['daily', 'weekly', 'monthly'],
    tag: "games",
    isOwner: false,
    onlyGp: false,
    onlyDm: false,
    isAdmin: false,
    isAdminOrDm: false,
    handler: async function ({ m, sock }, lang, text) {
        let now= +new Date
        let user = await global.db.data.users[m.sender]
        switch (m.command) {
            case 'daily':
    if (await now - await user.daily < 1000 * 60 * 60 * 24 ) {
        await m.replyWithTyping(await global.lang.q('cantclaim', lang, m, await msToDuration((await user.daily+(1000*60*60*24))-await now)));
    } else {
        const money = pickRandom([300, 500, 700, 900, 500, 800, 900, 1100, 1350, 1500]) * 1;
        const coin = pickRandom([300, 500, 700, 900, 500, 800, 900, 1100, 1350, 1500]) * 1;
        const str = `Money : ${money} \n┃Coins : ${coin}`;
        global.db.data.users[m.sender].money = money;
        global.db.data.users[m.sender].coin = coin;
        user.daily=+new Date
        await m.reply(await global.lang.q('claimed', lang, m, str));
    }
    break;
case 'weekly':
    if (await now - await user.weekly < 1000 * 60 * 60 * 24 * 7 ) {
        await m.replyWithTyping(await global.lang.q('cantclaim', lang, m, await msToDuration((await user.weekly+(1000*60*60*24*7))-await now)));
    } else {
        const money = pickRandom([3000, 5000, 7000, 9000, 5000, 8000, 9000, 11000, 13050, 15000]) * 1;
        const coin = pickRandom([3000, 5000, 7000, 9000, 5000, 8000, 9000, 11000, 13500, 15000]) * 1;
        const str = `Money : ${money} \n┃Coins : ${coin}`;
        global.db.data.users[m.sender].money = money;
        global.db.data.users[m.sender].coin = coin;
        user.weekly=+new Date
        await m.reply(await global.lang.q('claimed', lang, m, str));
    }
    break;
case 'monthly':
    if (await now - await user.monthly < 1000 * 60 * 60 * 24 *28) {
        await m.replyWithTyping(await global.lang.q('cantclaim', lang, m, await msToDuration((await user.monthly+(1000*60*60*24*27))-await now)));
    } else {
        const money = pickRandom([30000, 50000, 70000, 90000, 50000, 80000, 90000, 110000, 135000, 150000]) * 1;
        const coin = pickRandom([30000, 50000, 70000, 90000, 50000, 80000, 90000, 110000, 135000, 150000]) * 1;
        const str = `Money : ${money} \n┃Coins : ${coin}`;
        global.db.data.users[m.sender].money = money;
        global.db.data.users[m.sender].coin = coin;
        user.monthly =+new Date
        await m.reply(await global.lang.q('claimed', lang, m, str));
    }
    break;
}

}

        };
