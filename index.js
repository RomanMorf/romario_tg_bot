const bot = require('./bot.api')
const { messageHandle } = require('./message.handle')
const { callbackHandle } = require('./callback.handle')

const { gameData } = require('./data/gameData-andrey')
// const { gameData } = require('./data/gameData-masha-new')

bot.setMyCommands([
  {command: '/start', description: 'Начальное приветсвие'},
  {command: '/info', description: 'Информация о боте'},
])

//---------------------------------------------------------------

bot.on('message', msg => {
  messageHandle(msg, gameData)
})

//---------------------------------------------------------------

bot.on('callback_query', async msg => {
  callbackHandle(msg, gameData)
})

//---------------------------------------------------------------
