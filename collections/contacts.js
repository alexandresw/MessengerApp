Contacts = new Mongo.Collection("contacts");

Contacts.helpers({
  contactUser: function() {
    return Meteor.users.findOne(this.contactId);
  }
});

// Contacts.list = function(userId){
//    return this.find({ userId: userId || Meteor.userId() });
// };

Contacts.attachSchema(
   new SimpleSchema({
      userId: {
         type: String,
         denyUpdate: true
      },
      contactId: {
         type: String,
         denyUpdate: true
      }
   })
);
