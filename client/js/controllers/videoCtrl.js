angular
.module('MessengerApp')
.controller('VideoCtrl', VideoCtrl);

// webrtc = null;

function VideoCtrl ($scope, $ionicModal, $meteor, $sce, webrtcService) {

	
	$scope.webrtcUsers = $scope.$meteorCollection(Cwebrtc, true);
	$scope.webrtcUsersVideo = {};
	$scope.videoHTML = null;

   $scope.connectWebrtc = connectWebrtc;

   console.log("1");

    
	function addWebrtcUser(doc){

		$scope.webrtcUsersVideo[JSON.stringify(doc.peerId)] = {
			peerObj: doc.peerObj,
			videoObj: doc.videoObj
		};

		if(doc.videoObj){

			$scope.videoHTML = $sce.trustAsHtml(doc.videoObj.outerHTML);

		}


		$scope.webrtcUsers.save(
			{peerId: doc.peerId},
			{
				peerId: doc.peerId,
				videoId: doc.videoId,
				nick: doc.nick,
				active: true,
				raisedHand: false,
				muted: true
			},
			{upsert: 1}
			);
	}

	function removeWebrtcUser(id){
		var webrtcUser = $scope.webrtcUsers.findOne( {$or: [ {peerId: id}, {videoId: id} ] });
	// check if is active user
	if(webrtcUser && webrtcUser.peerId === getWebrtcActiveUser().peerId){
		var someUser = $scope.webrtcUsers.findOne({active: false});
		if(someUser){
			activeUser(someUser.peerId, true);
		}
	}

	if(webrtcUser && $scope.webrtcUsersVideo[JSON.stringify(webrtcUser.peerId)]){
		delete $scope.webrtcUsersVideo[JSON.stringify(webrtcUser.peerId)];
		$scope.webrtcUsers.remove({_id: webrtcUser._id});
	}
	}

	function getWebrtcUserVideo(id){
		var webrtcUser = $scope.webrtcUsers.findOne( {$or: [ {peerId: id}, {videoId: id} ] });
		if(webrtcUser && $scope.webrtcUsersVideo[JSON.stringify(webrtcUser.peerId)]){
			return {
				peerId: webrtcUser.peerId,
				nick: webrtcUser.nick,
				active: webrtcUser.active,
				raisedHand: webrtcUser.raisedHand,
				peerObj: $scope.webrtcUsersVideo[JSON.stringify(webrtcUser.peerId)].peerObj,
				videoObj: $scope.webrtcUsersVideo[JSON.stringify(webrtcUser.peerId)].videoObj
			};
		}
	}




    function connectWebrtc() {


         var webrtc = webrtcService.startWebRtc();


        // var webrtc = new SimpleWebRTC({
        //     // the id/element dom element that will hold "our" video
        //     localVideoEl: 'localVideo',
        //     // the id/element dom element that will hold remote videos
        //     remoteVideosEl: 'remotesVideos',
        //     // immediately ask for camera access
        //     autoRequestMedia: true
        //   });



      webrtc.on('readyToCall', function () {
         console.log("readyToCall called...");
         webrtc.joinRoom();

      });

      // a peer video has been added
      webrtc.on('videoAdded', function (video, peer) {
         console.log('video added', peer);

         var videoId = video.id;
         if(peer.type === 'audio'){
            video.pause();
            video = null;
         }
         else{
            video.oncontextmenu = function () { return false; };
         }

         var obj = {
            peerId: peer.id,
            videoId: videoId,
            nick: peer.nick,
            peerObj: peer,
            videoObj: video
         };

         addWebrtcUser(obj);

      });


      // a peer was removed
      webrtc.on('videoRemoved', function (video, peer) {
         removeWebrtcUser(peer.id);
      });


      // // local volume has changed
      // webrtc.on('volumeChange', function (volume, treshold) {
      //    showVolume(document.getElementById('localVolume'), volume);
      // });
      // //remote volume has changed
      // webrtc.on('remoteVolumeChange', function (peer, volume) {
      //    showVolume(document.getElementById('volume_' + peer.id), volume);
      // });



      // function showVolume(el, volume) {
      //    if (!el) return;
      //    if (volume < -45) volume = -45; // -45 to -20 is
      //    if (volume > -20) volume = -20; // a good range
      //    el.value = volume;
      // }

      // // we got access to the camera
      // webrtc.on('localStream', function (stream) {
      //    var button = document.querySelector('form>button');
      //    if (button) button.removeAttribute('disabled');
      //    //$('#localVolume').show();
      // });
      // // we did not get access to the camera
      // webrtc.on('localMediaError', function (err) {
      // });

      // // local screen obtained
      // webrtc.on('localScreenAdded', function (video) {
      //    video.onclick = function () {
      //       video.style.width = video.videoWidth + 'px';
      //       video.style.height = video.videoHeight + 'px';
      //    };
      //    document.getElementById('localScreenContainer').appendChild(video);
      //    $('#localScreenContainer').show();
      // });
      // // local screen removed
      // webrtc.on('localScreenRemoved', function (video) {
      //    document.getElementById('localScreenContainer').removeChild(video);
      //    $('#localScreenContainer').hide();
      // });

      // webrtc.on('mute', function (data) { // show muted symbol
      //    console.log("mute event - data: " + JSON.stringify(data));
      //    // audioMute(data.id, true);

      // });

      // webrtc.on('unmute', function (data) { // show muted symbol
      //    console.log("unmute event - data: " + JSON.stringify(data));
      //    // audioMute(data.id, false);
      // });




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
   //}

   // TODO: Wait a bit since we are adding more stuff into the DOM.
    // setTimeout(function () {
    //  window.startWebRtc(webrtcMethods, false);
    // }, 6000);



}

