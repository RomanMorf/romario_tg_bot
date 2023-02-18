const { messageHandle } = require('./message.handle')
const { sendMesFunc } = require('./message.func')
const { setUserCount } = require('./firebase.func')

const { showRules } = require('./message.rules')


const callbackHandle = async ( msg, gameData ) => {
  const data = msg.data
  const chatId = msg.message.chat.id

  if (data === '/game') {
    await setUserCount(chatId, 0)
    await messageHandle(msg, gameData)
    return
  }

  if (data === '/rules') {
    showRules({ chatId })
    return
  }
}

exports.callbackHandle = callbackHandle