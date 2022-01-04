const bot = require('./bot.api')

function sendMesFunc(text, delay, id, options) {
  setTimeout(()=> bot.sendMessage(id, `${text}`, options), delay * 1000)
}

function sendPhotoFunc(photoLink, delay, id, options) {
  setTimeout(()=> bot.sendPhoto(id, `${photoLink}`, options), delay * 1000)
}


exports.sendMesFunc = sendMesFunc
exports.sendPhotoFunc = sendPhotoFunc