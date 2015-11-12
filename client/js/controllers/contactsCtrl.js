angular
.module('MessengerApp')
.controller('ContactsCtrl', ContactsCtrl);

function ContactsCtrl ($scope, $ionicModal, $meteor) {

	$scope.contacts = $scope.$meteorCollection(Contacts, false);

	$ionicModal.fromTemplateUrl('client/views/newContact.html', {
		scope: $scope
	}).then(function (modal) {
		$scope.modal = modal;
	});

	$scope.$on('$destroy', function () {
		$scope.modal.remove();
	});

	$scope.openNewContactModal = openNewContactModal;
	$scope.remove = remove;

	function openNewContactModal () {
		$scope.modal.show();
	}

	function remove (contact) {
		$meteor.call('removeContact', contact._id);
	}

}