angular
  .module('MessengerApp')
  .controller('MainCtrl', MainCtrl);

function MainCtrl ($scope, $state, $stateParams, $ionicScrollDelegate, $timeout, $meteor, $ionicPopup) {


	function showNewCallingMessage(room) {
		var confirmPopup = $ionicPopup.confirm({
			title: 'Videochat',
			template: 'Videochat comming!'
		});
		confirmPopup.then(function(res) {
			if(res) {
				goToVideoCall(room._id);
			} else {
				Rooms.update({_id: room._id}, {$set: { status: 'Disconnected' }});
			}
		});
	}

	function goToVideoCall(roomId) {
		return $state.go('video', {roomId: roomId});
	}

	$scope.autorun(function() {
		console.log("calling autorun mainCtrl.js");

		var roomCalling = Rooms.findOne({receiverId: Meteor.userId(), status: 'Calling'});
		if(roomCalling){
			showNewCallingMessage(roomCalling);
		}
	});


}
