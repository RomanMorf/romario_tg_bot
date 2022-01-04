module.exports = {
  gameOptions: {
    reply_markup: JSON.stringify({
        inline_keyboard: [
        [{text: 'Начать игру', callback_data: '/game'}],
        [{text: 'Прочитать правила игры', callback_data: '/rules'}],
      ]
    })
  },  
  startOrNoOptions: {
    reply_markup: JSON.stringify({
        inline_keyboard: [
          [{text: 'Начинаем', callback_data: '/letStart'}],
          [{text: 'Не... я хочу выпить для начала 🍾', callback_data: '/letdrink'}],
          [{text: 'Ой... Мне в этот раз страшно )', callback_data: '/scared'}],
        ]
    })
  },

// ------------------------------------
  alcoholOptions: {
    reply_markup: JSON.stringify({
        inline_keyboard: [
        [{text: '🍺', callback_data: '/beer'},{text: '🍾', callback_data: '/champane'},{text: '🍸', callback_data: '/matrini'}],
        [{text: '🍩', callback_data: '/beer'},{text: '🍧', callback_data: '/champane'},{text: '🍔', callback_data: '/matrini'}],
        [{text: '🍩', callback_data: '/beer'},{text: '🍧', callback_data: '/champane'},{text: '🍔', callback_data: '/matrini'}],
      ]
    })
  },
// ------------------------------------
}