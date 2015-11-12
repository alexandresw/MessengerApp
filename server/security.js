// Security rules

////////////////////////////////////////////////////////////////////////////////
// Users rules
////////////////////////////////////////////////////////////////////////////////

// Custom Methods
Security.defineMethod("ifIsCurrentUser", {
  fetch: [],
  transform: null,
  deny: function (type, arg, userId, doc) {
    return userId !== doc._id;
  }
});


// Applying Rules

Meteor.users.permit('update')
   .ifLoggedIn()
   .ifIsCurrentUser()
   .apply();

Meteor.users.permit('remove')
   .ifLoggedIn()
   .ifIsCurrentUser()
   .apply();


////////////////////////////////////////////////////////////////////////////////
// Contacts rules
////////////////////////////////////////////////////////////////////////////////

// Custom Methods

Security.defineMethod("ifOwnsContact", {
  fetch: [],
  transform: null,
  deny: function (type, arg, userId, doc) {
     return userId !== doc.userId;
  }
});


// Applying Rules

Contacts.permit(['insert', 'remove'])
   .ifLoggedIn()
   .ifOwnsContact()
   .apply();



////////////////////////////////////////////////////////////////////////////////
// Messages rules
////////////////////////////////////////////////////////////////////////////////

// Custom Methods

// Security.defineMethod("ifIsSenderMessage", {
//   fetch: [],
//   transform: null,
//   deny: function (type, arg, userId, doc) {
//      return userId !== doc.userId;
//   }
// });


// Applying Rules

// Messages.permit(['insert', 'remove'])
//    .ifLoggedIn()
//    .ifIsSenderMessage()
//    .apply();

// Messages.permit('update')
//    .ifLoggedIn()
//    .ifIsReceiverMessage()
//    .onlyProps('read')
//    .apply();

////////////////////////////////////////////////////////////////////////////////
// 
////////////////////////////////////////////////////////////////////////////////



