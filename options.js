module.exports = {
  gameOptions: {
    reply_markup: JSON.stringify({
        inline_keyboard: [
        [{text: 'Начать игру', callback_data: '/game'}],
        [{text: 'Прочитать правила игры', callback_data: '/rules'}],
      ]
    })
  },  
// ------------------------------------
}