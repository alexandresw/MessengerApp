Template.contactList.onRendered(function(){


});

Template.contactList.helpers({
   contactList: function(){
      return Meteor.user().contacts();
   }
});


Template.contactList.events({
   'click #addContact': function(t, e){
      var email = $('#contactEmail').val();

      Meteor.call('createNewContact', email);
   }
});
