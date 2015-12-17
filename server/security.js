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
// Rooms rules
////////////////////////////////////////////////////////////////////////////////

// Custom Methods

Security.defineMethod("ifOwnsRoom", {
  fetch: [],
  transform: null,
  deny: function (type, arg, userId, doc) {
     return !(userId === doc.callerId || userId === doc.receiverId);
  }
});


// Applying Rules

Rooms.permit(['insert', 'update', 'remove'])
   .ifLoggedIn()
   .ifOwnsRoom()
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



