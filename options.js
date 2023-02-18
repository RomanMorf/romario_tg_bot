module.exports = {
  gameOptions: {
    reply_markup: JSON.stringify({
        inline_keyboard: [
        [{text: 'Почати гру', callback_data: '/game'}],
        [{text: 'Правила гри', callback_data: '/rules'}],
      ]
    })
  },  
// ------------------------------------
}