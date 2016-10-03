(function(){

angular.module('app.routes', ['ionic', 'ui.router'])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js

  $urlRouterProvider.otherwise('/login');
  $stateProvider
    
  
  .state('login', {
    url: '/login',
    templateUrl: 'js/login/defaultLogin.html',
    controller: 'DefaultLoginController as login'
  })

  .state('tabs', {
    url: '/tabs',
    templateUrl: 'js/tabs/tabs.html',
    abstract: true
  })

    .state('tabs.dashboard', {
      url: '/dashboard',
      views: {
        'dashboard': {
          templateUrl: 'js/tabs/dashboard/dashboard.html',
          controller: 'DashboardController as dashboard'
        }
      }
    })

    .state('tabs.create', {
      url: '/create',
      views: {
        'create': {
          templateUrl: 'js/tabs/create/create.html',
          controller: 'CreateController as create'
        }
      }
    })

    // .state('chatScreen1', {
    //   url: '/page5',
    //   templateUrl: 'templates/chatScreen1.html',
    //   controller: 'chatScreen1Ctrl'
    // })

    // .state('chatScreen2', {
    //   url: '/page6',
    //   templateUrl: 'templates/chatScreen2.html',
    //   controller: 'chatScreen2Ctrl'
    // })

    .state('tabs.profile', {
      url: '/profile',
      views: {
        'profile': {
          templateUrl: 'js/tabs/profile/profile.html',
          controller: 'ProfileController as profile'
        }
      }
    })

    .state('tabs.notifications', {
      url: '/notifications',
      views: {
        'notifications': {
          templateUrl: 'js/tabs/notifications/notifications.html',
          controller: 'NotificationsController as notifications'
        }
      }
    });

  });

})();