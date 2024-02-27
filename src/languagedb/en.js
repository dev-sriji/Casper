const { emoji } = require('../../config');
module.exports = {
  languageCode: "en",
  hello:'Hello',
  ping: '♠️ *Ping :* ',
  user:"user",
  welcome: "About to start the Adventure",
  regH: "*Wrong Use Of Command* ...\n\n_Example:_\n\t\t_/reg <name> <age> <Gender>_\n\t\t_/reg casper-19-F_\n\nGender : \n\t\t\tM - Male\n\t\t\tF - Female\n\t\t\tN - Non-Binary",
  regD: `User Registeration Completed ${emoji.check}`,
  languageSet: `Language Set : <?yourlang> ${emoji.check}`,
  hhelp: 'List Commands',
  hping: 'Speed Test',
  hlang: 'To Set Language',
  hreg: 'To Register',
  youwon:`Congratulations! You won ${emoji.hooray}`,
  youloss:`Sorry, You Lost...${emoji.sed}`,
  coins:"Coins!",
  slot:"Slot ",
  roll:"Roll The Dice",
  diamond:'Diamond',
  money:'Money',
  coin:'Coin',
  doller:'Doller',
  dmToken:'DM Token',
  balH:'To Display Balance',
  games:"GAMES",
  main:'MAIN',
  tossW:`You Can Only Enter Number (1 to 6 Only)...🐱\n\n_▶️ Example : */toss ${Math.floor(Math.random() * 6) + 1}*_`,
  youChoose: "You Choose : ",
  result:'Result : ',
  cooldown: async function (em) {
    return `You Must Wait Till ${await em.command}CoolDown : ${new Date - await em.lastSlot}`
  },  
  notext: async function (em,type) {
    return `*Enter Any ${type.toUpperCase()=='N'?'Number':'Text'}* 🐱\n_▶️Example:_\n\t\t${await em.usedPrefix}${em.command} ${type=='N'?'69':'querry'}`
  },
  enter: async function (em) {
    return `*You have successfully entered the game _${await em.command.toUpperCase()}_*`
  },
  ing: async function (em) {
    return `*_${await em.command.toLowerCase()}ing Your Amount..._*`
  },
  notenough: async function (em) {
    return `😺 *Your Money Is Not Enough To _${await em.command}_* . \nCheck Your Balance Using /bal`
  },
  claimed: async function (em,type) {
    return `╭━━🎁━🎁━🎁━━⬣
┃ ✨ REWARD CLAIMED!!
┃ ✨ 𝙔𝙊𝙐 𝙂𝙀𝙏 𝘼 𝙂𝙄𝙁𝙏!!
┃ -Premium Reward: *${await em.premium ? '🎟️':'❌'}*
┃ ${await type?await type:'Reciever'+await em.name}
╰━━🎁━🎁━🎁━━⬣
    
    🎟️ 𝗣 𝗥 𝗘 𝗠 𝗜 𝗨 𝗠 ⇢ ${await em.premium ? '✅' : '❌'}\n- CASPER`
  },
  cantclaim: async function (em,type) {
    return `You Cannot Claim ${em.command} Right Now, You Have To Wait ${await type}`
  },
  daily : `To Claim Daily Reward`,
  weekly : `To Claim Weekly Reward`,
  monthly : `To Claim Monthly Reward`,
  //from here 
  aiH:async function(em){
    return `Hello @${await em.name} Please Enter Any Text So That I Can Help You,...\n\n_As An Ai Language Model, Created By Sriji, I Can Help You With Any Kind Of Appropriate Topic_`},
  //type here
};
