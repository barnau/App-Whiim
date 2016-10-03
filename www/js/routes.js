(function(){

angular.module('app.routes', ['ionic', 'ui.router'])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js

  $urlRouterProvider.otherwise('/login');
  $stateProvider
    
  // will go to login by default
  .state('login', {
    url: '/login',
    templateUrl: 'js/login/defaultLogin.html',
    controller: 'DefaultLoginController as login'
  })

  // abstract tabs view
  .state('tabs', {
    url: '/tabs',
    templateUrl: 'js/tabs/tabs.html',
    abstract: true
  })
    // requires tabs first to get to dashboard
    .state('tabs.dashboard', {
      url: '/dashboard',
      views: {
        'dashboard': {
          templateUrl: 'js/tabs/dashboard/dashboard.html',
          controller: 'DashboardController as dashboard'
        }
      }
    })
    // requires tabs first to get to create
    .state('tabs.create', {
      url: '/create',
      views: {
        'create': {
          templateUrl: 'js/tabs/create/create.html',
          controller: 'CreateController as create'
        }
      }
    })

    // requires tabs first to get to profile
    .state('tabs.profile', {
      url: '/profile',
      views: {
        'profile': {
          templateUrl: 'js/tabs/profile/profile.html',
          controller: 'ProfileController as profile'
        }
      }
    })
    // requires tabs first to get to notifications
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