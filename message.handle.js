const { sendMesFunc, sendPhotoFunc} = require('./message.func')
const { createNewUser, getUserData, setUserCount } = require('./firebase.func')
const { gameOptions, alcoholOptions, startOrNoOptions } = require('./options')

async function messageHandle(msg, gameData) {
  const chatId = msg.chat.id
  const text = msg.text.toLocaleLowerCase()

  let userData = await getUserData(chatId)
  let gameCount = null

  if (userData !== undefined) gameCount = userData.gameCount

  if (text === '/start') {
    const name = msg.from.first_name
    const lastName = msg.from.last_name

    if (userData === undefined) createNewUser(msg)
    sendMesFunc(`Приветствую - ${name ? name : ''} ${lastName ? lastName : ''}`, 0, chatId, gameOptions)

    return 
  }

  if (text === '/info') {
    sendMesFunc(`Ты всегда сможешь начать игру заново, если что-то пошло не так)`, 0, chatId)
    sendMesFunc(`Для это просто необходимо ввести /start`, 5, chatId)
    sendMesFunc(`До конца игры сможет дойти только самая-самая... `, 10, chatId)
    sendMesFunc(`Не сдавайся... Подарок того стоит ❤️`, 15, chatId)
    return
  }

  if (text === '/restart') {
    startGame(chatId)
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

  if (!gameData[gameCount]) {
    sendMesFunc('Игра окончена... Больше заданий у меня нет', 0, chatId)
    sendMesFunc('Если интересно, всегда можно начать с начала )', 3, chatId)
    sendMesFunc('Для этого - просто нажми /start', 7, chatId)
    return
  }

  sendMesFunc(gameData[gameCount].altText, 0, chatId)
}


exports.messageHandle = messageHandle