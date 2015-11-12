Meteor.publish('users', function () {
  if (!this.userId) return;
  return Meteor.users.list(this.userId);
});

Meteor.publish('contacts', function () {
  if (!this.userId) return;

  return Contacts.list(this.userId);
});

Meteor.publishComposite('chats', function () {
  if (! this.userId) {
    return;
  }

  return {
    find: function () {
      return Chats.find({ userIds: this.userId });
    },
    children: [
    {
      find: function (chat) {
        return Messages.find({ chatId: chat._id });
      }
    },
    {
      find: function (chat) {
        var query = { _id: { $in: chat.userIds } };
        var options = { fields: { profile: 1 } };

        return Meteor.users.find(query, options);
      }
    }
    ]
  }
});