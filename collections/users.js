
Meteor.users.list = function(userId){
  
  var contacts = Contacts.find({ userId: (userId || Meteor.userId()) });
  var contactIds = contacts.map(function(p) { return p.contactId });

  return Meteor.users.find({_id: {$in: contactIds}}, { fields: { profile: 1 } });
};


Schema = {};

Schema.Profile = new SimpleSchema({
    name: {
        type: String
    },
    phone: {
      type: String,
      optional: true
    }, 
    picture: {
      type: String,
      optional: true
    }
});

Schema.User = new SimpleSchema({
   createdAt: {
      type: Date
   },
   services: {
      type: Object,
      optional: true,
      blackbox: true
   },
    emails: {
        type: [Object]
    },
    "emails.$.address": {
        type: String,
        regEx: SimpleSchema.RegEx.Email
    },
    "emails.$.verified": {
        type: Boolean
    },
    profile: {
        type: Schema.Profile
    }
});

Meteor.users.attachSchema(Schema.User);
