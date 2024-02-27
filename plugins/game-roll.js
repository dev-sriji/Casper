function rollDice() {
    const randomNumber = Math.floor(Math.random() * 6) + 1;
    return randomNumber;
  }
const Winner = 650
const minMoney = 100
module.exports = {
    commands: ['dice',"dise",'roll', 'die'],
    help: ['toss'],
    tag: "games",
    isOwner: false,
    onlyGp: false,
    onlyDm: false,
    isAdmin: false,
    isAdminOrDm: false,
    handler: async function ({ m, sock }, lang, text) {
        if(global.db.data.users[m.sender].money < minMoney){
            m.reply(await global.lang.q('notenough',lang,m)+global.db.data.users[m.sender].money+await global.lang.q('money',lang))
        }else{
        if (!text) {
            m.reply(await global.lang.q('notext', lang, m, 'N'))
        } else if (isNaN(text) || !(text >= 1 && text <= 6))  {
            m.reply(await global.lang.q('tossW', lang))
        } else {
            const rollResult=await rollDice()
            let repl = `*${await global.lang.q('youChoose',lang)}_${text}_*\n*${await global.lang.q('result',lang)}_${rollResult}_*\n\n${text==rollResult? await global.lang.q('youwon',lang):await global.lang.q('youloss',lang)}\n♠️Win Amount : ${Winner}\nLoss Amount : ${minMoney}`
            m.reply(repl)
        }
}    }
};
