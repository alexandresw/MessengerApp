Meteor.methods({

  // createNewContact: function(email){
  //   check(email, String);

  //   contact = Accounts.findUserByEmail(email);
  //   if(contact){
  //     Contacts.insert({userId: Meteor.userId(), contactId: contact._id});
  //   }
  // },


  newMessage: function (message) {
    if (!this.userId) {
      throw new Meteor.Error('not-logged-in', 'Must be logged in to send message.');
    }
    check(message, {
      text: String,
      chatId: String
    });

    message.timestamp = new Date();
    message.userId = this.userId;

    var messageId = Messages.insert(message);
    var result = Chats.update({_id: message.chatId}, { $set: { lastMessage: message } });
    console.log(result);

    return messageId;
  },


  updateName: function (name) {
    if (! this.userId) {
      throw new Meteor.Error('not-logged-in', 'Must be logged in to update his name.');
    }

    check(name, String);
    if (name.length === 0) {
      throw Meteor.Error('name-required', 'Must provide user name');
    }

    return Meteor.users.update(this.userId, { $set: { 'profile.name': name } });
  },

  newChat: function (otherId) {
    if (! this.userId) {
      throw new Meteor.Error('not-logged-in', 'Must be logged to create a chat.');
    }

    check(otherId, String);

    var otherUser = Meteor.users.findOne(otherId);
    if (! otherUser) {
      throw new Meteor.Error('user-not-exists',
        'Chat\'s user not exists');
    }

    var chat = {
      userIds: [this.userId, otherId],
      createdAt: new Date()
    };

    var chatId = Chats.insert(chat);

    return chatId;
  },


  removeChat: function (chatId) {
    if (! this.userId) {
      throw new Meteor.Error('not-logged-in',
        'Must be logged to create a chat.');
    }

    check(chatId, String);

    var chat = Chats.findOne(chatId);
    if (! chat || ! _.include(chat.userIds, this.userId)) {
      throw new Meteor.Error('chat-not-exists',
        'Chat not exists');
    }

    Messages.remove({ chatId: chatId });

    return Chats.remove({ _id: chatId });
  },

  newContact: function (email) {
    if (!this.userId) {
      throw new Meteor.Error('not-logged-in', 'Must be logged to create a contact.');
    }

    check(email, String);

    var otherUser = Accounts.findUserByEmail(email);
    if (!otherUser) {
      throw new Meteor.Error('user-not-exists', 'User not exists');
    }

    var contact = {
      userId: this.userId, 
      contactId: otherUser._id
    };

    var contactId = Contacts.insert(contact);

    return contactId;
  },


  updatePicture: function (data) {
    if (! this.userId) {
      throw new Meteor.Error('not-logged-in', 'Must be logged in to update his picture.');
    }
 
    check(data, String);
 
    return Meteor.users.update(this.userId, { $set: { 'profile.picture': data } });
  },

  sendNotification: function(toUserId, message){
    if (!this.userId) {
      throw new Meteor.Error('not-logged-in', 'Must be logged to create a contact.');
    }

    check(toUserId, String);
    check(message, String);


    Push.send({
        from: 'push',
        title: 'Message',
        text: message,
        badge: 1, 
        query: {
            userId: toUserId
        }
        // token: appId or token eg. "{ apn: token }"
        // tokens: array of appId's or tokens
        // payload: user data
        // delayUntil: Date
    });

  },


  getIceServers: function(){
    if (!this.userId) {
      throw new Meteor.Error('not-logged-in', 'Must be logged to create a contact.');
    }

    var url = "https://service.xirsys.com/ice";
    var data = {
      ident: Meteor.settings.xirsysUsername,
      secret: Meteor.settings.xirsysSecret,
      domain: "52.22.19.104",
      application: "default",
      room: "default",
      secure: 1
    };

    var result = HTTP.call('POST', url, { "data": data});

    console.log(JSON.stringify(result.data.d));
    return result.data.d;
  },


  newVideoRoom: function (otherId) {
    if (! this.userId) {
      throw new Meteor.Error('not-logged-in', 'Must be logged to create a chat.');
    }

    check(otherId, String);

    var otherUser = Meteor.users.findOne(otherId);
    if (! otherUser) {
      throw new Meteor.Error('user-not-exists',
        'Chat\'s user not exists');
    }

    var room = {
      callerId: this.userId,
      receiverId: otherId,
      createdAt: new Date()
    };

    var roomId = Rooms.insert(room);

    return roomId;
  }



});


