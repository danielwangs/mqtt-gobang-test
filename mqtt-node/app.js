var mqtt = require('mqtt')
var client = mqtt.connect('ws://120.105.129.49:9001')

let gameStatus = null;

client.on('connect', function () {
  client.subscribe('pressChess', function (err) {
    if (!err) console.log('subscribe: pressChess!')
  })
  client.subscribe('getGameState', (err) => {
    if (!err) console.log('subscribe: getGameState!')
  })
  client.subscribe('resetGame', (err) => {
    if (!err) console.log('subscribe: resetGame!')
  })
})

client.on('message', function (topic, message) {
  switch (topic) {
    case 'pressChess':
      gameStatus = JSON.parse(message);
      console.log('pressChess: ', gameStatus)
      // 機械手臂溝通
      break;
    case 'getGameState':
      const strGameStatus = JSON.stringify(gameStatus)
      client.publish('gameState', strGameStatus)
      console.log('getGameState: ', gameStatus)
      break;
    case 'resetGame':
      gameStatus = null;
      client.publish('resetGame')
      console.log('resetGame: ', gameStatus)
      break;
  }
})