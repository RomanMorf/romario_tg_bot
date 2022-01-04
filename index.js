const bot = require('./bot.api')
const { messageHandle } = require('./message.handle')
const { sendMesFunc, sendPhotoFunc} = require('./message.func')
const { createNewUser, getUserData, setUserCount } = require('./firebase.func')

const { gameData } = require('./data/gameData2')

bot.setMyCommands([
  {command: '/start', description: 'Начальное приветствие'},
  {command: '/game', description: 'Начало игры по поиску подарка'},
  {command: '/info', description: 'Получить информацию по игре'},
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
    sendMesFunc(`Поехали !!! `, 0, chatId)
    sendMesFunc(`Итак.... Первый вопрос`, 3, chatId)
    sendMesFunc(`В каком городе мы сейчас находимся ?`, 3, chatId)
    return
  }

  if (data === '/rules') {
    sendMesFunc('Вашему вниманию представляються правила игры:', 0, chatId)
    sendMesFunc(`
Игра - это линейный квест. 
Следующее задание откроеться только после выполнения всех предыдущих. 
По ходу выполнения будут подсказки.
Если столкнешся с какими-то трудностями, что исключено 😁
Тебе всегда помогут... )

В любой момент игры, можно начать с начала.
Для это необходимо снова написать в чат /start
`, 2, chatId)
    return
  }

  return
})

//---------------------------------------------------------------
