angular
  .module('MessengerApp')
  .controller('ChatDetailsCtrl', ChatDetailsCtrl);
 
function ChatDetailsCtrl ($scope, $state, $stateParams, $ionicScrollDelegate, $timeout, $meteor, $ionicPopup) {
  var chatId = $stateParams.chatId;
  var isIOS = ionic.Platform.isWebView() && ionic.Platform.isIOS();
  $scope.chat = $scope.$meteorObject(Chats, chatId, false);
  $scope.contactId = _.without($scope.chat.userIds, Meteor.userId())[0];

  $scope.messages = $scope.$meteorCollection(function () {
    return Messages.find({ chatId: chatId });
  }, false);

  $scope.$watchCollection('messages', function (oldVal, newVal) {
    var animate = oldVal.length !== newVal.length;
    $ionicScrollDelegate.$getByHandle('chatScroll').scrollBottom(animate);
  });

  $scope.data = {};
  $scope.sendMessage = sendMessage;
  $scope.inputUp = inputUp;
  $scope.inputDown = inputDown;
  $scope.closeKeyboard = closeKeyboard;
  $scope.sendPicture = sendPicture;
  $scope.newVideoCall = newVideoCall;
 
 
  function sendMessage () {
    if (_.isEmpty($scope.data.message)) {
      return;
    }
 
    $meteor.call('newMessage', {
      text: $scope.data.message,
      type: 'text',
      chatId: chatId
    });
 
    delete $scope.data.message;
  }

  function sendPicture () {
    MeteorCameraUI.getPicture({}, (err, data) => {
      if (err && err.error == 'cancel') return;
      if (err) return handleError(err);
 
      Meteor.call('newMessage', {
        picture: data,
        type: 'picture',
        chatId: chatId
      });
    });
  }
 
  function handleError (err) {
    console.log('profile save error ' + err);
    $ionicPopup.alert({
      title: err.reason || 'Save failed',
      template: 'Please try again',
      okType: 'button-positive button-clear'
    });
  }

  function newVideoCall() {
    $meteor.call('newVideoRoom', $scope.contactId).then(goToVideo);
  }
 
  function goToVideo(roomId) {
    return $state.go('video', {roomId: roomId});
  }



  function inputUp () {
    if (isIOS) {
      $scope.data.keyboardHeight = 216;
    }
 
    $timeout(function() {
      $ionicScrollDelegate.$getByHandle('chatScroll').scrollBottom(true);
    }, 300);
  }
 
  function inputDown () {
    if (isIOS) {
      $scope.data.keyboardHeight = 0;
    }
 
    $ionicScrollDelegate.$getByHandle('chatScroll').resize();
  }
 
  function closeKeyboard () {
    // cordova.plugins.Keyboard.close();
  }


}