const firebase  = require('./firebase')

async function createNewUser(msg) {
  const newDate = Date()

  const newUser = {
    name: msg.from.first_name || '',
    lastName: msg.from.last_name || '',
    gameCount: 0,
    chatId: msg.chat.id,
    registerDate: newDate,
  }

  await firebase
    .database()
    .ref(`/users/${newUser.chatId}`)
    .set(newUser)
}


async function getUserData(id) {
  const newDate = Date()
  
  const userData = await (
    await firebase
      .database()
      .ref(`/users/`)
      .child(id)
      .once('value')
  ).val() || undefined

  await firebase
      .database()
      .ref(`/users/${id}/lastVisit`)
      .set(newDate)

  return await userData
}

async function setUserCount(id, userCount) {
  await firebase
    .database()
    .ref(`/users/${id}/gameCount/`)
    .set(userCount)
}

exports.createNewUser = createNewUser
exports.getUserData = getUserData
exports.setUserCount = setUserCount