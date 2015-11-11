Template.signin.events({

   'submit #loginForm' : function(e, t){
      e.preventDefault();
      // retrieve the input field values
      var email = t.find('#email').value;
      var password = t.find('#password').value;

      // Trim and validate your fields here....

      // If validation passes, supply the appropriate fields to the
      // Meteor.loginWithPassword() function.
      Meteor.loginWithPassword(email, password, function(err){
         if (err){
            $('#errorMessage').text(err);
         }
         else{
            FlowRouter.go('/chats');
         }
      });

      return false;
   }
});
