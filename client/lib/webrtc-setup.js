function SocketIoConnection(connection) {
   this.connection = connection;
}

SocketIoConnection.prototype.on = function (ev, fn) {
   this.connection.on(ev, fn);
};

joinCbFunc = null;
SocketIoConnection.prototype.emit = function (ev) {
   if(ev === 'join'){
      joinCbFunc = arguments[2];
   }
   this.connection.emit(ev, arguments[1]);
};

Streamy.on('joinCb', function(data) {
   joinCbFunc(null, data);
});

SocketIoConnection.prototype.getSessionid = function () {
   return this.connection.id();
};

SocketIoConnection.prototype.disconnect = function () { };


angular
.module('MessengerApp')
.factory('webrtcService', function($meteor) {
    return {
      startWebRtc: function() {

        console.log("Starting webrtc...");
        var username = 'test'; //$meteor.user().profile.name;

        var peerConnectionConfig = {
          'iceServers': [
            {'url': 'stun:stun.l.google.com:19302'},
            {'url': 'stun:107.20.146.157:443'},
            {'url': 'turn:ninefingers@107.20.146.157:443?transport=tcp', 'credential': 'youhavetoberealistic'}
          ]
          //'iceTransports': 'relay' // force turnserver
        };

        console.log("SreamyID:"+Streamy.id());
        var conn = new SocketIoConnection(Streamy);

        var webrtc = new SimpleWebRTC({
            localVideoEl: 'localVideo',
            remoteVideosEl: '',
            autoRequestMedia: true,
            connection: conn,
            nick: username,
            peerConnectionConfig: peerConnectionConfig
          });

        webrtc.sessionReady = true;

        return webrtc;

      }
    };


 });

