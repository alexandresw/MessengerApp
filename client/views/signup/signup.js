Template.signup.events({

	'submit #signupForm' : function(e, t) {
      e.preventDefault();

      var fullName      = t.find('#fullName').value;
      var email      = t.find('#email').value;
      var password      = t.find('#password').value;

      var attrs = {
         email: email,
         password : password,
         profile: {
            fullName: fullName,
            
         }
      };

      Accounts.createUser(attrs, function(){
            FlowRouter.go('/profile');
      });


   }

});







// common fields
      // 
      

      