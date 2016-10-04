// (function() {
//     'use strict';

    

    angular
        .module('app')
        .controller('DefaultLoginController', DefaultLoginController);

    DefaultLoginController.$inject = ['$state', 'FirebaseFactory', '$stateParams', '$scope', '$firebaseObject', 'toastr', '$localStorage', '$sessionStorage' ];

    /* @ngInject */
    function DefaultLoginController($state, FirebaseFactory, $stateParams, $scope, $firebaseObject, toastr, $localStorage, $sessionStorage) {
        
        var vm = this;
        vm.title = 'DefaultLoginController';
        vm.test = 'this is a test from DefaultLoginController';
        vm.logIn = logIn;
        vm.logOut = logOut;
        vm.facebookLogIn = facebookLogIn;

         firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
             //$sessionStorage.uid = user.uid;
            
            // $state.go('tabs.dashboard');
          } else {

            
            $state.go('login');
          }
        });

         function facebookLogIn() {
            
            FirebaseFactory.facebookLogIn()
         }


        function logIn() {
            FirebaseFactory.logIn(vm.email, vm.password);
        }

        function logOut() {
            FirebaseFactory.logOff();
        }
    }

    


