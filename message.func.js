const bot = require('./bot.api')

function sendMesFunc(text, id, delay, options) {
  setTimeout(()=> bot.sendMessage(id, `${text}`, options), delay * 1000)
}

function sendPhotoFunc(photoLink, id, delay, options) {
  setTimeout(()=> bot.sendPhoto(id, `${photoLink}`, options), delay * 1000)
}


exports.sendMesFunc = sendMesFunc
exports.sendPhotoFunc = sendPhotoFunc