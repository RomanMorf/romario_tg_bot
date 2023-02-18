const { sendMesFunc, sendPhotoFunc} = require('./message.func')

const showRules = async function({chatId, gameOptions = {}}) {
  sendMesFunc('Правила гри:', chatId)
  sendMesFunc(`
Гра - це лінейний квест. 
Наступне запитання буде показано тільки після відповіді на попереднє. 
В грі повно підказок. Хвилюватись немає чого )


В будьякий момент гри - можна почати спочатку.
Для цього необходно в чат надіслати повідомлення /start

Хай щастить !
`, chatId)
sendMesFunc('Стартуй, у тебе все вийде ! /start', chatId, gameOptions)

}

exports.showRules = showRules