const bot = require('./bot.api')
const { messageHandle } = require('./message.handle')
const { callbackHandle } = require('./callback.handle')

const { gameData } = require('./data/gameData-masha-new')

bot.setMyCommands([
  {command: '/start', description: 'Початкове вітання'},
  {command: '/info', description: 'Інформація щодо бота'},
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
