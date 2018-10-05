var mqtt = require('mqtt')
var client = mqtt.connect('ws://120.105.129.49:9001')

client.on('connect', function () {
  client.publish('pressChess', JSON.stringify([0, 2, 1, 0, 0, 0]))
  client.publish('pressChess', JSON.stringify([0, 2, 1, 1, 0, 0]))

  setTimeout(() => {
    client.publish('getGameState')
  }, 1000)
  setTimeout(() => {
    client.publish('resetGame')
  }, 2000)
})

// client.end()