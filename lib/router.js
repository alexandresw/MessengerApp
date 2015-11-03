FlowRouter.route('/', {
   action: function(){
      BlazeLayout.render('mainLayout', {content: 'signin'} );
   }
});

FlowRouter.route('/signup', {
   action: function(){
      BlazeLayout.render('mainLayout', {content: 'signup'} );
   }
});

FlowRouter.route('/contacts', {
   action: function(){
      BlazeLayout.render('mainLayout', {content: 'contactList'} );
   }
});

FlowRouter.route('/chats', {
   action: function(){
      BlazeLayout.render('mainLayout', {content: 'chatList'} );
   }
});

FlowRouter.route('/chat/:userId?', {
   action: function(){
      BlazeLayout.render('mainLayout', {content: 'chat'} );
   }
});

FlowRouter.route('/profile', {
   action: function(){
      BlazeLayout.render('mainLayout', {content: 'profile'} );
   }
});

FlowRouter.route('/preferences', {
   action: function(){
      BlazeLayout.render('mainLayout', {content: 'preferences'} );
   }
});

FlowRouter.route('/avatar', {
   action: function(){
      BlazeLayout.render('mainLayout', {content: 'avatar'} );
   }
});

FlowRouter.route('/about', {
   action: function(){
      BlazeLayout.render('mainLayout', {content: 'about'} );
   }
});
