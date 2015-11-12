angular
.module('MessengerApp')
.controller('ChatsCtrl', ChatsCtrl);

function ChatsCtrl ($scope, $ionicModal, $meteor) {

	$scope.chats = $scope.$meteorCollection(Chats, false);

	$ionicModal.fromTemplateUrl('client/views/newChat.html', {
		scope: $scope
	}).then(function (modal) {
		$scope.modal = modal;
	});

	$scope.$on('$destroy', function () {
		$scope.modal.remove();
	});

	$scope.openNewChatModal = openNewChatModal;
	$scope.remove = remove;

	function openNewChatModal () {
		$scope.modal.show();
	}

	function remove (chat) {
		$meteor.call('removeChat', chat._id);
	}

}