angular
  .module('MessengerApp')
  .controller('ContactDetailsCtrl', ContactDetailsCtrl);
 
function ContactDetailsCtrl ($scope, $state, $stateParams, $ionicScrollDelegate, $timeout, $meteor) {
  var contactId = $stateParams.contactId;

  $scope.contact = $scope.$meteorObject(Contacts, contactId, false);

  $scope.data = {};
  $scope.newChat = newChat;
 
 
  // TODO: Use same as newChatCtrl
  function newChat(userId) {
    var chat = Chats.findOne({userIds: {$all: [Meteor.userId(), userId]}});
    if (chat) {
      return goToChat(chat._id);
    }
 
    $meteor.call('newChat', userId).then(goToChat);
  }
 
  function goToChat(chatId) {
    return $state.go('tab.chat-details', {chatId: chatId});
  }


}