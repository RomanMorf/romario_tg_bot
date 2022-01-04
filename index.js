require('dotenv').config()
const TelegramBot = require('node-telegram-bot-api');
const firebase  = require('./firebase')

const token = process.env.TOKEN;

const bot = new TelegramBot(token, {polling: true});
// bot.setWebHook(process.env.HEROKU_URL + bot.token);

const { gameOptions, alcoholOptions, startOrNoOptions } = require('./options')
const { gameData } = require('./gameData2')


bot.setMyCommands([
  {command: '/start', description: 'Начальное приветствие'},
  {command: '/game', description: 'Начало игры по поиску подарка'},
  {command: '/info', description: 'Получить информацию по игре'},
])
let newUser = {
  name: 'Romario',
  age: 34
}
async function createNewUser(id, newUser = {}) {
  await firebase
    .database()
    .ref(`/users/${id}`)
    .set(newUser)
}

async function getUserData(id) {
  const userData = await (
    await firebase
      .database()
      .ref(`/users/`)
      .child(id)
      .once('value')
  ).val() || {}
  console.log(userData, 'userData');
  return await userData
}

async function setUserCount(id, userCount) {
  await firebase
    .database()
    .ref(`/users/${id}/gameCount/`)
    .set(userCount)
}


async function superPuperGame(text, gameData, chatId, msg) {

  let userData = await getUserData(chatId)
  console.log(userData.gameCount, 'count');
  let gameCount = userData.gameCount

  if (!gameData[gameCount]) {
    sendMesFunc('Игра окончена... Больше заданий у меня нет', 0, chatId)
    sendMesFunc('Если интересно, всегда можно начать с начала )', 3, chatId)
    sendMesFunc('Для этого - просто нажми /start', 7, chatId)
    return
  }

  if (text === '/start') {
    const name = msg.from.first_name
    const lastName = msg.from.last_name

    const newUser = {
      name: name,
      lastName: lastName,
      gameCount: 0
    }

    sendMesFunc(`Приветствую - ${name ? name : ''} ${lastName ? lastName : ''}`, 0, chatId, gameOptions)
    createNewUser(chatId, newUser)

    return 
  }

  if (text === '/info') {
    sendMesFunc(`Ты всегда сможешь начать игру заново, если что-то пошло не так)`, 0, chatId)
    sendMesFunc(`Для это просто необходимо ввести /start`, 5, chatId)
    sendMesFunc(`До конца игры сможет дойти только самая-самая... `, 10, chatId)
    sendMesFunc(`Не сдавайся... Подарок того стоит ❤️`, 15, chatId)
    return
  }

  if (text === '/game') {
    startGame(chatId)
    gameCount = 1
    return 
  }

  if (text === '/alco') {
    const name = msg.from.first_name
    const lastname = msg.from.last_name
    sendMesFunc(`Приветствую - ${name ? name : ''} ${lastname ? lastname : ''}`, 0, chatId, alcoholOptions)
    return 
  }


  if (text === gameData[gameCount].answer ) {
    let idx = 0

    gameData[gameCount].text.forEach((text, index) => {
      idx += 1
      const delay = text[1] || index * 5
      sendMesFunc(text[0], delay, chatId)
    })

    if (gameData[gameCount].photo) {
      gameData[gameCount].photo.forEach((photo, index) => {
        const delay = photo[1] || idx > index ? idx * 5 : index * 5
        sendPhotoFunc(photo[0], delay, chatId)
        idx += 1
      })
    }
    gameCount += 1
    setUserCount(chatId, gameCount)
    return
  } 


  sendMesFunc(gameData[gameCount].altText, 0, chatId)
}

//---------------------------------------------------------------
bot.on('message', msg => {
  const chatId = msg.chat.id;
  const text = msg.text.toLocaleLowerCase()

  superPuperGame(text, gameData, chatId, msg)
})


function startGame(chatId) {
  gameCount = 1
  setUserCount(chatId, gameCount)

  sendMesFunc('Добро пожаловать в новогодний квест часть вторая ! 🥳 Ну что ж... начнём искать 🎁', 0, chatId)
  sendMesFunc('В первом квесте ты уже научилась принципу отгадывания и прохождения заданий', 4, chatId)
  sendMesFunc('По этому, теперь тебе будет еще лугче и интереснее 😉', 8, chatId, startOrNoOptions)
}
function sendMesFunc(text = '...', delay = 0, id = chatId, options) {
  setTimeout(()=> bot.sendMessage(id, `${text}`, options), delay * 1000)
}
function sendPhotoFunc(photoLink, delay, id, options) {
  setTimeout(()=> bot.sendPhoto(id, `${photoLink}`, options), delay * 1000)
}

bot.on('callback_query', (msg) => {
  const data = msg.data
  const chatId = msg.message.chat.id


  if (data === '/game') {
    startGame(chatId)
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
sendMesFunc('Не переживай. Старуй у тебя всё получиться ! /start', 5, chatId)
    return
  }


  if (data === '/beer') {
    console.log(chatId, 'заказал пиво');
    sendMesFunc(`Ваш зака на 1 пиво - принят )`, 0, chatId)
    sendMesFunc(`Ожидайте )`, 3, chatId)
    return
  }
  if (data === '/champane') {
    console.log(chatId, 'заказал шампанское');
    sendMesFunc(`Ваш зака на бокал шампанского - принят )`, 0, chatId)
    sendMesFunc(`Ожидайте )`, 3, chatId)
    return
  }


  if (data === '/letStart') {
    gameCount = 1

    sendMesFunc(`Поехали !!! `, 0, chatId)
    sendMesFunc(`Итак.... Первый вопрос`, 3, chatId)
    sendMesFunc(`В каком городе мы сейчас находимся ?`, 3, chatId)
    return
  }
  if (data === '/letdrink') {
    sendMesFunc(`Вопросов нет ))) Твоё право )`, 0, chatId)
    sendMesFunc(`Только сильно не напивайся. а то до конца квеста не дойдёшь 😁`, 3, chatId)
    sendMesFunc(`Когда будешь готова нажми /start`, 6, chatId)
    return
  }
  if (data === '/scared') {
    sendMesFunc(`Не переживай !`, 0, chatId)
    sendMesFunc(`Ты точно српавишся 😁`, 3, chatId)
    sendMesFunc(`Я в тебя верю !`, 6, chatId)
    sendMesFunc(`Смело жим /letStart`, 9, chatId)
    return
  }

  return
})
