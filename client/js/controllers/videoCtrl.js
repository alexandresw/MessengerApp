angular
.module('MessengerApp')
.controller('VideoCtrl', VideoCtrl);

function VideoCtrl ($scope, $state, $stateParams, $ionicModal, $meteor, $ionicPopup, webrtcService) {

  console.log("roomId="+$stateParams.roomId);
	$scope.room = Rooms.findOne({_id: $stateParams.roomId});
  $scope.connectWebrtc = connectWebrtc;
  $scope.hangup = hangup;
  $scope.webrtc = null;

  if(!$scope.room) hangup();

  function hangup() {
    clearInterval(window.hangupInteval);
    if($scope.webrtc){
      console.log('hangup...');
      $scope.webrtc.stopLocalVideo();
      $scope.webrtc.leaveRoom();
    }
    $state.go('tab.contacts');
  }

  function showHangupMessage() {
    clearInterval(window.hangupInteval);
    var alertPopup = $ionicPopup.alert({
      title: 'Videochat',
      template: 'Videochat has disconnected!'
    });
    alertPopup.then(function(res) {
      hangup();
    });
  };

  window.hangupInteval = setInterval(function(){
    if(!Rooms.findOne({_id: $stateParams.roomId})){
      showHangupMessage();
      clearInterval(window.hangupInteval);
    }
  }, 3000);


  $scope.autorun(function() {
    console.log('autorun video: ');
    console.log('autorun video: ' + $scope.room);
    if($scope.room && $scope.room.status === 'Rejected'){
      showHangupMessage();
    }
  });


  //setTimeout(function(){
    connectWebrtc();  
  //}, 2000);
  

  function connectWebrtc() {

    var webrtc = webrtcService.startWebRtc();

    webrtc.on('readyToCall', function () {
       console.log("readyToCall called... room:"+$scope.room._id);
       webrtc.joinRoom({'roomId': $scope.room._id});

    });

    // a peer video has been added
    webrtc.on('videoAdded', function (video, peer) {
       console.log('video added', peer);

    });

    // a peer was removed
    webrtc.on('videoRemoved', function (video, peer) {
      showHangupMessage();
    });

    ////////////////////////////////////////////////////////////////////////////

    // local p2p/ice failure
    webrtc.on('iceFailed', function (peer) {
        console.log('local fail');
    });
    // remote p2p/ice failure
    webrtc.on('connectivityError', function (peer) {
        console.log('remote fail');
    });

    $scope.webrtc = webrtc;

 }


}

