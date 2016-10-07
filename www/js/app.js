(function() {
    'use strict';

    angular
        .module('app', [
            'ionic', 'ui.router', 'firebase', 'toastr', 'ngStorage', 'ionic.contrib.ui.tinderCards'
        ])
        .config(function appConfig($urlRouterProvider, $stateProvider) {

            // Ionic uses AngularUI Router which uses the concept of states
            // Learn more here: https://github.com/angular-ui/ui-router
            // Set up the various states which the app can be in.
            // Each state's controller can be found in it's feature folder

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
                abstract: true,
                controller: 'TabsController'

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
                        controller: 'NotificationsController as notifs'
                    }
                }
            });

        })

        .controller('TabsController', function($scope, $rootScope, FirebaseFactory, $firebaseArray, toastr, $sessionStorage) {
            //listen to event fired when user logs in

            var notificationsRef = firebase.database().ref('notifications/' + $sessionStorage.uid);
            $scope.notifications = $firebaseArray(notificationsRef);
            $scope.notifications.$loaded().then(function(notifications) {
                    $scope.num = notifications.length
            });

            setTimeout(function() {
                alert('time out works')
                notificationsRef.on('child_added', function(data) {
                   console.log('below data from child added');
                    $scope.notifications.$loaded().then(function(notifications) {
                        $scope.num = notifications.length;
                         console.log(notifications);
                        toastr.success('New notification from');
                    })
                   
            });

            }, 20000)

            

            // $rootScope.$on('userLoggedIn', function(event, args) {
            //     console.log(args.uid);

               
            //     $scope.notifications.$loaded().then(function(notifications) {
            //         $scope.num = notifications.length
            //     })
                
                

            //  })

            // var notificationsRef = firebase.database().ref('notifications/' + $sessionStorage.uid);
            // notificationsRef.on('child_added', function(data) {
            //        console.log('below data from child added');
            //         $scope.notifications.$loaded().then(function(notifications) {
            //             $scope.num = notifications.length;
            //              console.log(notifications);
            //             toastr.success('New notification from '  )
            //         })
                   
            // });
        })
        .run(function appRun($ionicPlatform) {
            $ionicPlatform.ready(function() {
                if (window.cordova && window.cordova.plugins.Keyboard) {
                    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                    // for form inputs)
                    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

                    // Don't remove this line unless you know what you are doing. It stops the viewport
                    // from snapping when text inputs are focused. Ionic handles this internally for
                    // a much nicer keyboard experience.
                    cordova.plugins.Keyboard.disableScroll(true);
                }
                if (window.StatusBar) {
                    StatusBar.styleDefault();
                }
            });
        });




})();
