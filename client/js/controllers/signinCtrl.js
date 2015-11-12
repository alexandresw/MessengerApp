angular
  .module('MessengerApp')
  .controller('SigninCtrl', SigninCtrl);
 
function SigninCtrl($scope, $state, $ionicLoading, $ionicPopup, $log) {
  $scope.data = {};
  $scope.login = login;
 
 
  function login() {
    if (_.isEmpty($scope.data.email) || _.isEmpty($scope.data.password)) {
      return;
    }
 
    $ionicLoading.show({
      template: 'Loading...'
    });

    Meteor.loginWithPassword($scope.data.email, $scope.data.password , function (err) {
      $ionicLoading.hide();

      if (err) {
        return handleError(err);
      }

      $state.go('tab.chats');
    });

  }
  
 
  function handleError(err) {
    $log.error('Login error ', err);
 
    $ionicPopup.alert({
      title: err.reason || 'Login failed',
      template: 'Please try again',
      okType: 'button-positive button-clear'
    });
  }
}