Connections = new Mongo.Collection("connections");

Streamy.on('join', function(data, from) {
   check(data.roomId, String);
   console.log("webrtc: join: data: "+data  + " - from: " + from);
   var roomId = data.roomId,
      userId = Streamy.userId(from),
      sessionId = Streamy.id(from);

   // create connection
   Connections.update(
      {userId: userId},
      {
         roomId: roomId,
         userId: userId,
         sessionId: sessionId,
         resources: { screen: false, video: true, audio: false }
      },
      {upsert: 1}
   );

   // reply others users data
   var result = { clients: {} };
   Connections.find({
      roomId: roomId,
      userId: {$ne: userId},
   }).fetch().map(function(con){
      result.clients[con.sessionId] = { screen: con.resources.screen, video: true, audio: false };
   });

   var room = Rooms.findOne({_id: roomId});
   if(room && room.receiverId === userId){
      Rooms.update({_id: roomId}, {$set: { status: 'Connected' }});   
   }

   Streamy.emit('joinCb', result, from);

});


Streamy.on('message', function(details, from) {
   if (!details) return;
   console.log(">>> message called - from: " + Streamy.id(from) + " - to: " + details.to);

   var otherClient = Streamy.sockets(details.to);
   if (!otherClient) return;

   details.from = Streamy.id(from);
   Streamy.emit('message', details, otherClient);
});

function removeFeed(sessionId, type) {

   var con = Connections.findOne({sessionId: sessionId});
   if(con){
      var roomId = con.roomId;
      Connections.remove({sessionId: sessionId});

      // notify others users about this remove
      Connections.find({
         roomId: roomId
      }).fetch().map( function(con){

         Streamy.emit('remove', {
            id: sessionId,
            type: type
         }, Streamy.sockets(con.sessionId));

      });

      Rooms.update({_id: roomId}, {$set: { status: 'Disconnected' }});  
   }
}

Streamy.on('leave', function (data, from) {
   console.log("videochat: leave called...." + Streamy.id(from));
   removeFeed(Streamy.id(from));
});

Streamy.onDisconnect( function (from) {
   console.log("videochat: disconnect called...." + Streamy.id(from));
   removeFeed(Streamy.id(from));
});
