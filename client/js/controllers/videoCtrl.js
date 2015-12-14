angular
.module('MessengerApp')
.controller('VideoCtrl', VideoCtrl);


function VideoCtrl ($scope, $ionicModal, $meteor, $sce, webrtcService) {
	
	$scope.webrtcUsers = null;
	$scope.webrtcUsersVideo = {};
	$scope.videoHTML = null;
  $scope.connectWebrtc = connectWebrtc;


	function addWebrtcUser(doc){

		// $scope.webrtcUsersVideo[JSON.stringify(doc.peerId)] = {
		// 	peerObj: doc.peerObj,
		// 	videoObj: doc.videoObj
		// };

		// if(doc.videoObj){
		// 	$scope.videoHTML = $sce.trustAsHtml(doc.videoObj.outerHTML);
  //     $('#localVideo').hide();
		// }


		// $scope.webrtcUsers = 
		// 	{
		// 		peerId: doc.peerId,
		// 		videoId: doc.videoId,
		// 		nick: doc.nick,
		// 		active: true,
		// 		raisedHand: false,
		// 		muted: true
		// 	};
	}

	// function removeWebrtcUser(id){
	// 	$scope.webrtcUsers = {};
	//    if($scope.webrtcUsersVideo[JSON.stringify(webrtcUser.peerId)]){
	// 	delete $scope.webrtcUsersVideo[JSON.stringify(webrtcUser.peerId)];
 //  	}
	// }

	// function getWebrtcUserVideo(id){
	// 	if($scope.webrtcUsersVideo[JSON.stringify(webrtcUser.peerId)]){
	// 		return {
	// 			peerId: webrtcUser.peerId,
	// 			nick: webrtcUser.nick,
	// 			active: webrtcUser.active,
	// 			raisedHand: webrtcUser.raisedHand,
	// 			peerObj: $scope.webrtcUsersVideo[JSON.stringify(webrtcUser.peerId)].peerObj,
	// 			videoObj: $scope.webrtcUsersVideo[JSON.stringify(webrtcUser.peerId)].videoObj
	// 		};
	// 	}
	// }

  //setTimeout(function(){
    connectWebrtc();  
  //}, 2000);
  

  function connectWebrtc() {

   var webrtc = webrtcService.startWebRtc();

    webrtc.on('readyToCall', function () {
       console.log("readyToCall called...");
       webrtc.joinRoom();

    });

    // a peer video has been added
    webrtc.on('videoAdded', function (video, peer) {
       console.log('video added', peer);

       // var videoId = video.id;
       // if(peer.type === 'audio'){
       //    video.pause();
       //    video = null;
       // }
       // else{
       //    video.oncontextmenu = function () { return false; };
       // }

       // var obj = {
       //    peerId: peer.id,
       //    videoId: videoId,
       //    nick: peer.nick,
       //    peerObj: peer,
       //    videoObj: video
       // };

       // addWebrtcUser(obj);

    });


    // a peer was removed
    webrtc.on('videoRemoved', function (video, peer) {
       removeWebrtcUser(peer.id);
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


 }


}

