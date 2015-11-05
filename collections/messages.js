Messages = new Mongo.Collection("messages");

Messages.list = function(chatId){
   return this.find( {chatId: chatId});
};

Messages.sendNewMessage = function(chatId, text){
   Messages.insert({
      chatId: chatId,
      senderId: Meteor.userId(),
      text: text
   });
};

Messages.attachSchema(
   new SimpleSchema({
      chatId: {
         type: String,
         denyUpdate: true
      },
      senderId: {
         type: String,
         denyUpdate: true
      },
      read: {
         type: Boolean,
         defaultValue: false
      },
      text: {
         type: String,
         denyUpdate: true
      },
      sentAt: {
         type: Date,
         denyUpdate: true,
         autoValue: function() {
            if (this.isInsert) {
               return new Date();
            }
         }
      }
   })
);
