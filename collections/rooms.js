Rooms = new Mongo.Collection("rooms");


Rooms.attachSchema(
   new SimpleSchema({
      callerId: {
         type: String,
         denyUpdate: true
      },
      receiverId: {
         type: String,
         denyUpdate: true
      },
      createdAt: {
         type: Date,
         denyUpdate: true
      },
   })
);
