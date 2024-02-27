module.exports = {
  commands: ['reg','register'],
  help: ['register'],
  tag: 'main',
  isOwner: false,
  onlyGp: false,
  onlyDm: false,
  isAdmin: false,
  isAdminOrDm: false,
  handler: async function ({ m }, lang, text) {
    const pattern = /^[a-zA-Z]+[\s\-\.]\d+[\s\-\.][mfnMFN]$/i;

    const parts = text.split(/[\s\-\.]+/);
    if (!text) {
      m.reply(await global.lang.q("regH", lang));
    } else if ((pattern.test(text))) {
      m.reply(await global.lang.q("regD", lang));
      global.db.data.users[m.sender].name = parts[0]
      global.db.data.users[m.sender].age = parts[1]
      global.db.data.users[m.sender].gender = parts[2]?.toUpperCase()
      // m.replyWithTyping(`Saved Data : \n\t\tName : ${global.db.data.users[m.sender].name}\n\t\tAge : ${global.db.data.users[m.sender].age}\n\t\tGender:${global.db.data.users[m.sender].gender}`)
    } else {
      m.reply(await global.lang.q("regD",lang))
    }
    //   m.reply(global.db.data)
  },
};
