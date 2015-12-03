angular
.module('MessengerApp')
.config(config);

function config($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('signin', {
    url: '/signin',
    templateUrl: 'client/views/signin.html',
    controller: 'SigninCtrl'
  })
  .state('signup', {
    url: '/signup',
    templateUrl: 'client/views/signup.html',
    controller: 'SignupCtrl'
  })
  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'client/views/tabs.html',
    resolve: {
      user: ['$meteor', function ($meteor) {
        return $meteor.requireUser();
      }],
      chats: ['$meteor', function ($meteor) {
        return $meteor.subscribe('chats');
      }],
      contacts: ['$meteor', function ($meteor) {
        return $meteor.subscribe('contacts');
      }],
      users: ['$meteor', function ($meteor) {
        return $meteor.subscribe('users');
      }]
    }
  })
  .state('tab.contacts', {
    url: '/contacts',
    views: {
      'tab-contacts': {
        templateUrl: 'client/views/contacts.html',
        controller: 'ContactsCtrl'
      }
    }
  })
  .state('tab.contact-details', {
    url: '/contacts/:contactId',
    views: {
      'tab-contacts': {
        templateUrl: 'client/views/contactDetails.html',
        controller: 'ContactDetailsCtrl'
      }
    }
  })
  .state('tab.chats', {
    url: '/chats',
    views: {
      'tab-chats': {
        templateUrl: 'client/views/chats.html',
        controller: 'ChatsCtrl'
      }
    }
  })
  .state('tab.chat-details', {
    url: '/chats/:chatId',
    views: {
      'tab-chats': {
        templateUrl: 'client/views/chatDetails.html',
        controller: 'ChatDetailsCtrl'
      }
    }
  })
  .state('tab.settings', {
    url: '/settings',
    views: {
      'tab-settings': {
        templateUrl: 'client/views/settings.html',
        controller: 'SettingsCtrl'
      }
    }
  })
  .state('profile', {
    url: '/profile',
    templateUrl: 'client/views/profile.html',
    controller: 'ProfileCtrl',
    resolve: {
      user: ['$meteor', function ($meteor) {
        return $meteor.requireUser();
      }]
    }
  })
  .state('video', {
    url: '/video',
    templateUrl: 'client/views/video/video.html',
    controller: 'VideoCtrl'
    // resolve: {
    //   user: ['$meteor', function ($meteor) {
    //     return $meteor.requireUser();
    //   }]
    // }
  });

  $urlRouterProvider.otherwise('video');
}