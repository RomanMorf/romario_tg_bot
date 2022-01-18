const { sendMesFunc, sendPhotoFunc} = require('./message.func')
const { createNewUser, getUserData, setUserCount, getAllUsers } = require('./firebase.func')
const options = require('./options')

const messageSendDelay = 3

async function messageHandle(msg, gameData) {
  let chatId
  let text

  if (msg.message_id) {
    chatId = msg.chat.id
    text = msg.text.toLocaleLowerCase()
  } else {
    chatId = msg.message.chat.id
    text = msg.data.toLocaleLowerCase()
  }


  let slicedMes = text.split(' | ')
  console.log(slicedMes, 'splicedMes');

  let userData = await getUserData(chatId)
  let gameCount = null
  if (userData === undefined) await createNewUser(msg)

  if (userData !== undefined) gameCount = userData.gameCount

  switch (text) {
    case '/start':
      const name = msg.from.first_name
      const lastName = msg.from.last_name
      sendMesFunc(`Приветствую - ${name ? name : ''} ${lastName ? lastName : ''}`, chatId, 0, options.gameOptions)
      return;

    case '/info':
      sendMesFunc(`Тестовый чат бот. Создан с целью изучения работы telegram api, node js, firebase database`,chatId)
      return;

    case '/all':
      console.log('sendtoall');
      const users = await getAllUsers()
      const prevId = msg.message_id
      console.log(msg, 'msg');
      users.forEach(user => {
        sendMesFunc(`sendtoall - message for ${user.name}`,user.chatId)
        sendMesFunc(`sendtoall - message for `,user.chatId)
      })
      return;

    case gameData[gameCount].answer:
      let idx = 0

      gameData[gameCount].text.forEach((text, index) => {
        idx += 1
        const delay = text[1] || index * messageSendDelay
        sendMesFunc(text[0], chatId, delay)
      })
  
      if (gameData[gameCount].photo) {
        gameData[gameCount].photo.forEach((photo, index) => {
          const delay = photo[1] || idx > index ? idx * messageSendDelay : index * messageSendDelay
          sendPhotoFunc(photo[0], chatId, delay)
          idx += 1
        })
      }
      gameCount += 1
      setUserCount(chatId, gameCount)
      return;

    default:
      sendMesFunc(gameData[gameCount].altText, chatId)
  }

}


exports.messageHandle = messageHandle