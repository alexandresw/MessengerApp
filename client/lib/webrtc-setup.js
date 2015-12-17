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

APPwebrtcConfigpeerConnectionConfig = null;

$(function() {

  Meteor.call('getIceServers', function(error, data){
    APPwebrtcConfigpeerConnectionConfig = data
  });

});


angular
.module('MessengerApp')
.factory('webrtcService', function($rootScope, $meteor) {
    return {
      startWebRtc: function() {

        console.log("Starting webrtc...");
        var username = Meteor.user().profile.name;

        var peerConnectionConfig = {
          'iceServers': [
            {'url': 'stun:stun.l.google.com:19302'}
          ],
          //'iceTransports': 'relay' // force turnserver
        };

        if(APPwebrtcConfigpeerConnectionConfig){
          peerConnectionConfig = APPwebrtcConfigpeerConnectionConfig;
        }

        console.log("peerConnectionConfig:"+JSON.stringify(peerConnectionConfig));

        console.log("SreamyID:"+Streamy.id());
        var conn = new SocketIoConnection(Streamy);

        var webrtc = new SimpleWebRTC({
            localVideoEl: 'mini-video',
            remoteVideosEl: 'remote-video',
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

