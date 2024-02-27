const emojis = ["🍒", "🍋", "🍊", "🍇", "🍉", "🍏"];

function getRandomEmoji() {
    const randomIndex = Math.floor(Math.random() * emojis.length);
    return emojis[randomIndex];
}

function spinSlot() {
    const results = [];
    for (let i = 0; i < 9; i++) {
        results.push(getRandomEmoji());
    }
    return results;
}

function checkWin(emojis) {
    // Check for a win condition here
    // You win if all three emojis in a column are the same
    for (let i = 0; i < 3; i++) {
        if (
            emojis[i] === emojis[i + 3] &&
            emojis[i + 3] === emojis[i + 6]
        ) {
            return true;
        }
    }
    return false;
}

async function playSlot(slottingAmount, lang) {
    if (slottingAmount <= 0) {
        return "Please enter a valid slotting amount.";
    }

    const spinResult = spinSlot();
    const isWin = checkWin(spinResult);

    const spins = [
        spinResult.slice(0, 3),
        spinResult.slice(3, 6),
        spinResult.slice(6, 9),
    ];

    let message = `
  *🎰VIRTUAL SLOTS🎰*

  ${spins[0].join("|")}
  -+-+-<<==
  ${spins[1].join("|")}
  -+-+-<<==
  ${spins[2].join("|")}

  ${isWin ? await global.lang.q('youwon', lang) : await global.lang.q('youloss', lang)} ${isWin ? slottingAmount * 20 : slottingAmount} ${await global.lang.q('coins', lang)} ${isWin ? "🎉" : "😔"}`;

    return { message, isWin };
}
module.exports = {
    commands: ['slot'],
    help: ['slot'],
    tag: "games",
    isOwner: false,
    onlyGp: false,
    onlyDm: false,
    isAdmin: false,
    isAdminOrDm: false,
    handler: async function ({ m, sock }, lang, text) {
        if (!text || isNaN(text) || text <=0) {
            await m.reply(await global.lang.q('notext', lang, m,"N"));
        } else {
            if (+new Date - global.db.data.users[m.sender].lastSlot < 8 * 1000) {
                m.replyWithTyping(await global.lang.q('cooldown', lang, m))
            } else {
                if(global.db.data.users[m.sender].money<text){
                    m.reply(await global.lang.q('notenough',lang,m))
                }else{
                global.db.data.users[m.sender].lastSlot = +new Date
                // m.reply(await global.lang.q('enter', lang, m))
                await m.replyWithTyping(await global.lang.q('ing', lang, m))
                const result = await playSlot(text, lang)
                await m.replyWithTyping(await result.message)
                if (result.isWin) {
                    global.db.data.users[m.sender].money += text * 20;
                } else {
                    global.db.data.users[m.sender].money -= text
                }}
            }

        }
    }
};