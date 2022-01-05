const bot = require('./bot.api')
const { messageHandle } = require('./message.handle')
const { sendMesFunc } = require('./message.func')
const { setUserCount } = require('./firebase.func')

const { gameData } = require('./data/gameData2')

bot.setMyCommands([
  {command: '/start', description: 'Начальное приветствие'},
  {command: '/info', description: 'Получить информацию про бота'},
])

//---------------------------------------------------------------

bot.on('message', msg => {
  messageHandle(msg, gameData)
})

//---------------------------------------------------------------

bot.on('callback_query', msg => {
  const data = msg.data
  const chatId = msg.message.chat.id

  if (data === '/game') {
    setUserCount(chatId, 1)
    sendMesFunc(`Поехали !!! `,chatId)
    sendMesFunc(`Итак.... Первый вопрос`,chatId, 3)
    sendMesFunc(`В каком городе мы сейчас находимся ?`,chatId, 5)
    return
  }

  if (data === '/rules') {
    setUserCount(chatId, 1)
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
