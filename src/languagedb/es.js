const { emoji } = require('../../config');
module.exports = {
  languageCode: "es",
  hello: 'Hola',
  ping: '♠️ *Ping :* ',
  user: "usuario",
  welcome: "A punto de comenzar la aventura",
  regH: "*Uso incorrecto de comando* ...\n\n_Ejemplo:_\n\t\t_/reg <nombre> <edad> <Género>_\n\t\t_/reg casper-19-F_\n\nGénero : \n\t\t\tM - Masculino\n\t\t\tF - Femenino\n\t\t\tN - No binario",
  regD: `Registro de usuario completado ${emoji.check}`,
  languageSet: `Idioma establecido : <?yourlang> ${emoji.check}`,
  hhelp: 'Comandos',
  hping: 'Prueba de velocidad',
  hlang: 'Para establecer el idioma',
  hreg: 'Para registrarse',
  youwon: `¡Felicidades! Has ganado ${emoji.hooray}`,
  youloss: `Lo siento, perdiste...${emoji.sed}`,
  coins: "Monedas",
  slot: "Máquina tragamonedas ",
  roll: "Tirar los dados",
  diamond: 'Diamante',
  money: 'Dinero',
  coin: 'Moneda',
  doller: 'Dólar',
  dmToken: 'Token de DM',
  balH: 'Para mostrar el saldo',
  games: "JUEGOS",
  main: 'PRINCIPAL',
  tossW: `Solo puedes ingresar números (del 1 al 6 solamente)...🐱\n\n_▶️ Ejemplo : */toss ${Math.floor(Math.random() * 6) + 1}*_`,
  youChoose: "Tú eliges : ",
  result: 'Resultado : ',
  cooldown: async function (em) {
    return `Debes esperar hasta que termine el enfriamiento de ${await em.command}: ${new Date - await em.lastSlot}`
  },
  notext: async function (em, type) {
    return `*Ingresa cualquier ${type.toUpperCase() == 'N' ? 'número' : 'texto'}* 🐱\n_▶️Ejemplo:_\n\t\t${await em.usedPrefix}${em.command} ${type == 'N' ? '69' : 'consulta'}`
  },
  enter: async function (em) {
    return `*Has ingresado con éxito al juego _${await em.command.toUpperCase()}_*`
  },
  ing: async function (em) {
    return `*_${await em.command.toLowerCase()}ndo tu cantidad..._*`
  },
  notenough: async function (em) {
    return `😺 *No tienes suficiente dinero para _${await em.command}_* . \nVerifica tu saldo usando /bal`
  },
  claimed: async function (em, tipo) {
    return `╭━━🎁━🎁━🎁━━⬣
┃ ✨ ¡RECOMPENSA RECLAMADA!
┃ ✨ ¡HAS OBTENIDO UN REGALO!
┃ - Recompensa Premium: *${await em.premium ? '🎟️' : '❌'}*
┃ ${await tipo ? await tipo : 'Receptor ' + await em.name}
╰━━🎁━🎁━🎁━━⬣
    
    🎟️ 𝗣 𝗥 𝗘 𝗠 𝗜 𝗨 𝗠 ⇢ ${await em.premium ? '✅' : '❌'}\n- CASPER`
  },
  cantclaim: async function (em, tipo) {
    return `No Puedes Reclamar ${em.command} en Este Momento. Debes Esperar ${await tipo}`
  },

  daily: "Para reclamar la recompensa diaria",
  weekly: "Para reclamar la recompensa semanal",
  monthly: "Para reclamar la recompensa mensual"
};
