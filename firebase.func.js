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

async function getAllUsers() {
  const usersData = await (
    await firebase
      .database()
      .ref(`/users/`)
      .once('value')
    ).val() || []

    const newUsers = await Object.keys(usersData).map((key) => ({ 
      ...usersData[key],
    }))

  return await newUsers
}


exports.createNewUser = createNewUser
exports.getUserData = getUserData
exports.setUserCount = setUserCount

exports.getAllUsers = getAllUsers


// by chat GPT
// async function createNewUser(msg) {
//   const newDate = new Date().toString(); // замінено на правильний спосіб отримання дати та часу

//   const newUser = {
//     name: msg.from.first_name || '',
//     lastName: msg.from.last_name || '',
//     gameCount: 0,
//     chatId: msg.chat.id,
//     registerDate: newDate,
//   };

//   await firebase
//     .database()
//     .ref(`/users/${newUser.chatId}`)
//     .set(newUser);
// }

// async function getUserData(id) {
//   const newDate = new Date().toString(); // замінено на правильний спосіб отримання дати та часу

//   const snapshot = await firebase // додано змінну для збереження snapshot з бази даних
//     .database()
//     .ref(`/users/${id}`)
//     .once('value');

//   if (!snapshot.exists()) {
//     return undefined; // якщо користувача не знайдено, повертаємо undefined
//   }

//   const userData = snapshot.val();

//   await firebase
//     .database()
//     .ref(`/users/${id}/lastVisit`)
//     .set(newDate);

//   return userData;
// }

// async function setUserCount(id, userCount) {
//   await firebase
//     .database()
//     .ref(`/users/${id}/gameCount`)
//     .set(userCount); // виправлено помилку з '/' перед 'gameCount'
// }

// async function getAllUsers() {
//   const snapshot = await firebase // додано змінну для збереження snapshot з бази даних
//     .database()
//     .ref(`/users`)
//     .once('value');

//   const usersData = snapshot.val() || []; // перевірено, що результат з бази даних не є null або undefined

//   const newUsers = Object.keys(usersData).map((key) => ({ 
//     ...usersData[key],
//   }));

//   return newUsers;
// }

// module.exports = { // змінено експорт на об'єкт
//   createNewUser,
//   getUserData,
//   setUserCount,
//   getAllUsers,
// };
