const { emoji } = require('../../config');
module.exports = {
  languageCode: "fr",
  hello: 'Bonjour',
  ping: '♠️ *Ping :* ',
  user: "utilisateur",
  welcome: "À propos de commencer l'aventure",
  regH: "*Utilisation incorrecte de la commande* ...\n\n_Exemple :_\n\t\t_/reg <nom> <âge> <sexe>_\n\t\t_/reg casper-19-F_\n\nSexe : \n\t\t\tM - Masculin\n\t\t\tF - Féminin\n\t\t\tN - Non-binaire",
  regD: `Inscription de l'utilisateur terminée ${emoji.check}`,
  languageSet: `Langue définie : <?yourlang> ${emoji.check}`,
  hhelp: 'Commandes',
  hping: 'Test de vitesse',
  hlang: 'Pour définir la langue',
  hreg: `Pour s'inscrire`,
  youwon: `Félicitations ! Vous avez gagné ${emoji.hooray}`,
  youloss: `Désolé, vous avez perdu...${emoji.sed}`,
  coins: "Pièces !",
  slot: "Machine à sous ",
  roll: "Lancer les dés",
  diamond: 'Diamant',
  money: 'Argent',
  coin: 'Pièce',
  doller: 'Dollar',
  dmToken: 'Jetons DM',
  balH: 'Pour afficher le solde',
  games: "JEUX",
  main: 'PRINCIPAL',
  tossW: `Vous ne pouvez entrer qu'un nombre (de 1 à 6 uniquement)...🐱\n\n_▶️ Exemple : */toss ${Math.floor(Math.random() * 6) + 1}*_`,
  youChoose: "Vous choisissez : ",
  result: 'Résultat : ',
  cooldown: async function (em) {
    return `Vous devez attendre jusqu'à ${await em.command}CoolDown : ${new Date - await em.lastSlot}`
  },
  notext: async function (em, type) {
    return `*Entrez un ${type.toUpperCase() == 'N' ? 'nombre' : 'texte'}* 🐱\n_▶️ Exemple :_\n\t\t${await em.usedPrefix}${em.command} ${type == 'N' ? '69' : 'requête'}`
  },
  enter: async function (em) {
    return `*Vous avez réussi à entrer dans le jeu _${await em.command.toUpperCase()}_*`
  },
  ing: async function (em) {
    return `*_${await em.command.toLowerCase()}ant votre montant..._*`
  },
  notenough: async function (em) {
    return `😺 *Votre argent ne suffit pas pour _${await em.command}_* . \nVérifiez votre solde en utilisant /bal`
  },
  claimed: async function (em, type) {
    return `╭━━🎁━🎁━🎁━━⬣
┃ ✨ RÉCOMPENSE RÉCLAMÉE !!
┃ ✨ VOUS AVEZ OBTENU UN CADEAU !!
┃ - Récompense Premium : *${await em.premium ? '🎟️' : '❌'}*
┃ ${await type ? await type : 'Destinataire' + await em.name}
╰━━🎁━🎁━🎁━━⬣
    
    🎟️ 𝗣 𝗥 𝗘 𝗠 𝗜 𝗨 𝗠 ⇢ ${await em.premium ? '✅' : '❌'}\n- CASPER`
  },
  cantclaim: async function (em, type) {
    return `Vous ne pouvez pas réclamer ${em.command} en ce moment. Vous devez attendre ${await type}`
  },
  daily: "Pour Réclamer la Récompense Quotidienne",
  weekly: "Pour Réclamer la Récompense Hebdomadaire",
  monthly: "Pour Réclamer la Récompense Mensuelle"
};
