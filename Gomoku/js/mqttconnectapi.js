
function onclickpublicsub() {

    // var mqtt = require('mqtt')
    var client = mqtt.connect('ws://host:port')

    let gameStatus = null;
    var $subTopic = '/pressChess'

    if (_.find(subs, { 'name': $subTopic })) {
        alert('已經 Subscribe過了...');
        return false;
      }
    else{
        client.on('connect', function () {
            client.subscribe('/demo', function (err) {
                if (!err) console.log('subscribe: /demo!')
            })
            client.subscribe('/pressChess', function (err) {
                if (!err) console.log('subscribe: pressChess!')
            })
            client.subscribe('/getGameState', (err) => {
                if (!err) console.log('subscribe: getGameState!')
            })
            client.subscribe('/resetGame', (err) => {
                if (!err) console.log('subscribe: resetGame!')
            })
        })
 
    }


    client.on('message', function (topic, message) {
        var message = message.toString();

        switch (topic) {
            case '/pressChess':
                gameStatus = JSON.parse(message);
                // whoplayer = publishData.player;
                // gameStatus = JSON.stringify(message);
                console.log('/pressChess: ', gameStatus)
                if(gameStatus.player === "userA_playing"){
                    client.publish('/getGameStateJSON', gameStatus)
                    // console.log('/getGameStateJSON ', gameStatus)
                }
                // console.log('pressChess:', whoplayer)

                // let state ="手臂正在動作"
                // client.publish('pressChess', state)
                // console.log('pressChess', state)

                // 機械手臂溝通
                break;
            case '/getGameState':
                const strGameStatus = JSON.stringify(gameStatus)
                client.publish('/getGameState', strGameStatus)
                console.log('/getGameState: ', gameStatus)
                break;
            case '/resetGame':
                // gameStatus = null;
                client.publish('/resetGame')
                console.log('/resetGame: ', gameStatus)
                break;
        }
    })

}

function userAPlaying_chess(){
    let $connectedstart = $("#onclickpublicsub")
    let $connectedBtnA = $("#userAplayer")
    let $connectedBtnB = $("#userBplayer")

    // let $DisconnectedBtn = $("#mqttDisconnect")
  
    $connectedstart.removeClass("badge-danger").addClass("badge-success")
    $connected.html("已連線")
    $connectedBtn.addClass("d-none")
    $DisconnectedBtn.removeClass("d-none")

}
function userAplayer(){
    console.log("UserA");

    // client.publish('pressChess', JSON.stringify([0, 2, 1, 0, 0, 0]))

    if (typeof client === 'object') {
        
        let topic = "/pressChess" 
        let player = "userA_playing"
        let gameStatus = [[1,2,1,2,21,2,2,1,11,2,1,1,2,2,1],[2,1,11,1,2,1,1,21,1,21]]
        let chessPos = {x: 10, y: 20}
        const publishData = {
            player,
            gameStatus,
            chessPos
        }


        let qos = "2"
        console.log(publishData.player)
        // let $qos = $('#pub-qos').val()
    
      
        client.publish(topic, JSON.stringify(publishData))
        let element = `
            <div class="alert alert-primary" role="alert">
            <h4 class="alert-heading">Topic: ${topic}</h4>

            <span class="badge badge-info">${qos}</span>
            </div>
            `
        $("#msgList").prepend(element)
  
      }
      else {
        alert('MQTT 尚未連線...')
        return false;
      }
}
function userBplayer(){
    console.log("UserB");

    // client.publish('pressChess', JSON.stringify([0, 2, 1, 0, 0, 0]))

    if (typeof client === 'object') {
        
        let topic = "/pressChess" 
        let player = "UserB_playing"
        let gameStatus = [[1,2,1,2,21,2,2,1,11,2,1,1,2,2,1],[2,1,11,1,2,1,1,21,1,21]]
        let chessPos = {x: 10, y: 20}
        const publishData = {
            player,
            gameStatus,
            chessPos
        }
        let qos = "2"
        console.log("UserB_playing")
        // let $qos = $('#pub-qos').val()
    
      
        client.publish(topic, JSON.stringify(publishData))
        let element = `
            <div class="alert alert-primary" role="alert">
            <h4 class="alert-heading">Topic: ${topic}</h4>
             <span class="badge badge-info">${qos}</span>
            </div>
            `
        $("#msgList").prepend(element)
  
      }
      else {
        alert('MQTT 尚未連線...')
        return false;
      }
}


function resetGame(){

    if (typeof client === 'object') {
        
        let topic = "/resetGame" 
        let message = "resetGame"
        let qos = "2"
        console.log("resetGame")
        // let $qos = $('#pub-qos').val()
    
      
        client.publish(topic, message)
        let element = `
            <div class="alert alert-primary" role="alert">
            <h4 class="alert-heading">Topic: ${topic}</h4>

            <span class="badge badge-info">${qos}</span>
            </div>
            `
        $("#msgList").prepend(element)
  
      }
      else {
        alert('MQTT 尚未連線...')
        return false;
      }
   
}

// function onMessage(topic, message, packet) {
//     console.log(packet)
//     let msgObj = {
//       topic: packet.topic,
//       qos: packet.qos,
//       payload: packet.payload.toString(),
//     }
//     let element = `
//     <div class="alert alert-primary" role="alert">
//       <h4 class="alert-heading">Topic: ${msgObj.topic}</h4>
//       <p>${msgObj.payload}</p>
//       <span class="badge badge-info">${msgObj.qos}</span>
//     </div>
//     `
//     $("#msgList").prepend(element)
//     messages.push(msgObj)
//   }
