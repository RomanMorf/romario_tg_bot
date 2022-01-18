const bot = require('./bot.api')
const { messageHandle } = require('./message.handle')
const { sendMesFunc } = require('./message.func')
const { setUserCount } = require('./firebase.func')

const { gameData } = require('./data/gameData3')

bot.setMyCommands([
  {command: '/start', description: 'Начальное приветствие'},
  {command: '/info', description: 'Получить информацию про бота'},
])

//---------------------------------------------------------------

bot.on('message', msg => {
  messageHandle(msg, gameData)
})

//---------------------------------------------------------------

bot.on('callback_query', async msg => {
  const data = msg.data
  const chatId = msg.message.chat.id

  if (data === '/game') {
    await setUserCount(chatId, 0)
    await messageHandle(msg, gameData)
    return
  }

  if (data === '/rules') {
    sendMesFunc(`Правила:`,chatId)
    sendMesFunc(`
1. ... 
2. ... 
3. ... 
    `,chatId, 1)
    return
  }

})

//---------------------------------------------------------------
