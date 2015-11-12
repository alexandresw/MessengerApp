angular
  .module('MessengerApp')
  .controller('SignupCtrl', SigninCtrl);
 
function SigninCtrl($scope, $state, $ionicLoading, $ionicPopup, $log) {
  $scope.data = {};
  $scope.createAccount = createAccount;
 
 
  function createAccount() {
    if (_.isEmpty($scope.data.name) || 
      _.isEmpty($scope.data.email) ||
       _.isEmpty($scope.data.password)) {
      return;
    }
 
    $ionicLoading.show({
      template: 'Loading...'
    });

    var attrs = {
         email: $scope.data.email,
         password : $scope.data.password,
         profile: {
            name: $scope.data.name,
            
         }
      };

      Accounts.createUser(attrs, function(err){
        $ionicLoading.hide();

        if (err) {
          return handleError(err);
        }

        $state.go('tab.chats');
      });
  }
  
 
  function handleError(err) {
    $log.error('Signup error ', err);
 
    $ionicPopup.alert({
      title: err.reason || 'Signup failed',
      template: 'Please try again',
      okType: 'button-positive button-clear'
    });
  }
}