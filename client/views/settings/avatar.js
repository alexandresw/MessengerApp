Template.avatar.events({
	'click #takePicture': function(t, e){
		console.log("take picture");

		MeteorCameraUI.getPicture({
        width: 225, height: 300
      }, function (err, data) {
      if (err && err.error == 'cancel') {
        return;
      }
 
      if (err) {
        return handleError(err);
      }

      Meteor.users.update({_id: Meteor.userId()}, {$set: {'profile.avatar': data}});
 
      
    });


	}
});