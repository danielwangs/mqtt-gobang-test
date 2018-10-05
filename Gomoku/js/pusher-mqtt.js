var Pusher = ( function(){
    function Pusher(host, port, options){
        var _this = this;

        options = options || {
            host: host,
            port: port,
            keepalive: 10,
            protocolId: 'MQTT',
            protocolVersion: 4,
            clean: true,
            reconnectPeriod: 1000,
            connectTimeout: 30 * 1000,
        }

        this.client = mqtt.connect(options)
        
        client.on('connect', this.onConnect)
        client.on('error', function (err) {
            console.log(err)
        })
    }
    Pusher.prototype.onConnect = function() {
        console.log("Success Connect...")
    }

    Pusher.prototype.disconnect = function() {
        this.client.end( function() {
            this.client = ''
        })
    }
    Pusher.prototype.subscribe = function(topic, qos) {
        if (this.client.connected) {
            if (topi) {
                
            }
        }
        else {
            // Not Connected
        }
    }
    return Pusher;
}());