// plugins/ping.js
const NetworkSpeed = require('network-speed');
const testNetworkSpeed = new NetworkSpeed();
module.exports = {
  commands: ['ping','speed','alive','speedtest'],
  help: ['ping'],
  tag: 'main',
  isOwner:false,
  onlyGp:false,
  onlyDm:false,
  isAdmin:false,
  isAdminOrDm:false,
   handler: async function ( { m , sock} , lang) {
    await sock.presenceSubscribe(m.sender)
    await sock.sendPresenceUpdate('composing', m.sender)
    let ping= "0.0"+(await getNetworkDownloadSpeed()).mbps.replace(".","");
    m.react("⭐")
    await sock.sendPresenceUpdate('paused', m.sender)
    await m.reply(await global.lang.q("ping",lang)+" *"+ping+"*");
  },
};

async function getNetworkDownloadSpeed() {
  const baseUrl = 'https://eu.httpbin.org/stream-bytes/500000';
  const fileSizeInBytes = 500000;
  const speed = await testNetworkSpeed.checkDownloadSpeed(baseUrl, fileSizeInBytes);
  return speed;
}