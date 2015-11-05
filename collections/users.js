Schema = {};

Schema.Profile = new SimpleSchema({
    fullName: {
        type: String
    },
    sex: {
        type: String,
        optional: true,
        allowedValues: ['Male', 'Female'],
        autoform: {
          afFieldInput: {
            type: "select-radio-inline"
          }
        }
    },
    phone: {
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
