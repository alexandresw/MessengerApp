angular
  .module('MessengerApp')
  .filter('userPicture', userPicture);
 
function userPicture () {
  return function (user) {
    if (!user) return;
 
    var hasPicture = user && user.profile && user.profile.picture;
 
    return hasPicture ? user.profile.picture : '/img/user-default.svg';
  }
}
