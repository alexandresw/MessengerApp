Meteor.methods({

	createNewContact: function(email){
		check(email, String);

		contact = Accounts.findUserByEmail(email);
		if(contact){
			Contacts.insert({userId: Meteor.userId(), contactId: contact._id});
		}
	}

});


