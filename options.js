module.exports = {
  gameOptions: {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [{text: 'Почати гру', callback_data: '/game'}],
        [{text: 'Правила гри', callback_data: '/rules'}],
      ]
    })
  },
  gameOptionsRU: {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [{text: 'Начать игру', callback_data: '/game'}],
        [{text: 'Правила игры', callback_data: '/rules'}],
      ]
    })
  },
  alcoholOptions: {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [{text: '🍺', callback_data: '/beer'},{text: '🍾', callback_data: '/champane'},{text: '🍸', callback_data: '/matrini'}],
        [{text: '🍩', callback_data: '/beer'},{text: '🍧', callback_data: '/champane'},{text: '🍔', callback_data: '/matrini'}],
      ]
    })
  },
}