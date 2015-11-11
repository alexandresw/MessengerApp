FlowRouter.triggers.enter([requiredLogin], {except: ["signin", "signup"]});

FlowRouter.route('/', {
   name: 'signin',
   action: function(){
      BlazeLayout.render('homeLayout', {content: 'signin'} );
   }
});

FlowRouter.route('/signup', {
   name: 'signup',
   action: function(){
      BlazeLayout.render('homeLayout', {content: 'signup'} );
   }
});

FlowRouter.route('/contacts', {
   action: function(){
      BlazeLayout.render('userLayout', {content: 'contactList'} );
   }
});


FlowRouter.route('/chats', {
   action: function(){
      BlazeLayout.render('userLayout', {content: 'chatList'} );
   }
});

FlowRouter.route('/chat/:chatId?', {
   action: function(){
      BlazeLayout.render('userLayout', {content: 'chat'} );
   }
});

FlowRouter.route('/profile', {
   action: function(){
      BlazeLayout.render('userLayout', {content: 'profile'} );
   }
});

FlowRouter.route('/preferences', {
   action: function(){
      BlazeLayout.render('userLayout', {content: 'preferences'} );
   }
});

FlowRouter.route('/avatar', {
   action: function(){
      BlazeLayout.render('userLayout', {content: 'avatar'} );
   }
});

FlowRouter.route('/about', {
   action: function(){
      BlazeLayout.render('userLayout', {content: 'about'} );
   }
});

FlowRouter.notFound = {
    action: function() {
      FlowRouter.go('/');
    }
};

function requiredLogin(context, redirect) {
   if(!Meteor.userId()) redirect('/');
};

