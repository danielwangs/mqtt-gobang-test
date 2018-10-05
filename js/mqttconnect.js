function onclickpublic() {

    let $topic1 = $("#pub-topic").val()
    let $msg = $("#msg").val()

    // var mqtt = require('mqtt')
    var client = mqtt.connect('ws://120.105.129.49:9001')
    var statusline = 0

    client.on('connect', function () {
      client.subscribe($topic1, function (err) {
        if (!err) {
          client.publish($topic1, $msg)
          statusline = $msg
          console.log(statusline)
        }
      })
    })

    client.on('message', function (topic, message) {
      // message is Buffer
      console.log(message.toString())
      client.end()
    })
  
}