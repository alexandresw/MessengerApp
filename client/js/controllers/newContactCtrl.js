angular
  .module('MessengerApp')
  .controller('NewContactCtrl', NewContactCtrl);
 
function NewContactCtrl($scope, $state, $meteor) {
  $scope.data = {};

  $scope.hideModal = hideModal;
  $scope.newContact = newContact;

 
  function hideModal() {
    $scope.modal.hide();
  }
 
  function newContact() {
    if (_.isEmpty($scope.data.email)) {
      return;
    }

    $meteor.call('newContact', $scope.data.email).then(function(contactId){
      hideModal();

      $scope.$meteorSubscribe('users').then(function () {
        return $state.go('tab.contact-details', {contactId: contactId}); 
      });

    });
    
  }
 
}
