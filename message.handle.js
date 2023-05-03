const { sendMesFunc, sendPhotoFunc } = require('./message.func')
const { createNewUser, getUserData, setUserCount, getAllUsers } = require('./firebase.func')
const { showRules } = require('./message.rules')

const options = require('./options')

const messageSendDelay = 3

async function messageHandle(msg, gameData) {
  let chatId
  let text
  let photo = null

  // console.log(msg, 'msg');

  if (msg.message_id) {
    if (msg.text) {
      chatId = msg.chat.id
      text = msg.text.toLocaleLowerCase()

    } else if (msg.photo) {
      photo = true
      chatId = msg.chat.id
      text = msg.caption ? msg.caption?.toLocaleLowerCase() : undefined
    }

  } else {
    chatId = msg.message.chat.id
    text = msg.data.toLocaleLowerCase()
  }

  if (text === undefined) return

  let slicedMes = text.split(' | ')
  console.log(slicedMes, 'splicedMes');

  let userData = await getUserData(chatId)
  let gameCount = null

  if (userData === undefined) await createNewUser(msg)

  if (userData !== undefined) gameCount = userData.gameCount

  if (text === '/start') {
    const name = msg.from.first_name
    const lastName = msg.from.last_name
    sendMesFunc(`Вітаю - ${name ? name : ''} ${lastName ? lastName : ''}`, chatId, 0, options.gameOptionsRU)
    return;
  }

  if (text === '/rules') {
    console.log('show rules');
    showRules({chatId})
  }

  if (text === '/info') {
    sendMesFunc(`Этот бот был создан в развлекательный целях )`, chatId)
    return;
  }

  if (text.includes('/sendtoall')) {
    console.log('❗️❗️❗️ Send to ALL ❗️❗️❗️');

    const users = await getAllUsers()
    const prevId = msg.message_id

    users.forEach(user => {
      
      photo
      ? sendMesFunc(`❗️❗️❗️\n${msg.caption.split('/sendtoall')[1]}`, user.chatId)
      : sendMesFunc(`❗️❗️❗️\n${msg.text.split('/sendtoall')[1]}`, user.chatId)
    })
    return;
  }

  if (text.includes(gameData[gameCount].answer) || text === '/game') {
    let idx = 0

    gameData[gameCount].text.forEach((text, index) => {
      if (text[0].includes('http')) {
        const delay = text[1] || idx > index ? idx * messageSendDelay : index * messageSendDelay
        sendPhotoFunc(text[0], chatId, delay)

      } else {
        // const delay = text[1] || idx > index ? idx * messageSendDelay : index * messageSendDelay
        const delay = text[1] || index * messageSendDelay

        console.log(text[1], 'text[1]');
        console.log(delay, 'delay');
        
        sendMesFunc(text[0], chatId, delay)
      }

      idx += 1
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
  }

  sendMesFunc(gameData[gameCount].altText, chatId)
}


exports.messageHandle = messageHandle