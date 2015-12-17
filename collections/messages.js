Messages = new Mongo.Collection("messages");

Messages.list = function(chatId){
   return this.find( {chatId: chatId});
};

Messages.attachSchema(
   new SimpleSchema({
      chatId: {
         type: String,
         denyUpdate: true
      },
      type: {
         type: String,
         denyUpdate: true
      },
      userId: {
         type: String,
         denyUpdate: true
      },
      read: {
         type: Boolean,
         defaultValue: false
      },
      text: {
         type: String,
         denyUpdate: true,
         optional: true
      },
      picture: {
         type: String,
         denyUpdate: true,
         optional: true
      },
      timestamp: {
         type: Date,
         denyUpdate: true
      }
   })
);
