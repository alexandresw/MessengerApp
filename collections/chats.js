Cwebrtc = new Mongo.Collection("webrtc");

Chats = new Mongo.Collection("chats");

Chats.attachSchema(
   new SimpleSchema({
      userIds: {
         type: [String],
         denyUpdate: true
      },
      createdAt: {
         type: Date,
         denyUpdate: true
      },
      lastMessage: {
      	type: Object,
      	optional: true
      }
   })
);
