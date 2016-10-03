// (function() {
//     'use strict';

    

    angular
        .module('app')
        .controller('DefaultLoginController', DefaultLoginController);

    DefaultLoginController.$inject = ['$state', 'FirebaseFactory', '$stateParams', '$scope', '$firebaseObject', 'toastr'];

    /* @ngInject */
    function DefaultLoginController($state, FirebaseFactory, $stateParams, $scope, $firebaseObject, toastr) {
        var vm = this;
        vm.title = 'DefaultLoginController';
        vm.test = 'this is a test from DefaultLoginController';
        vm.logIn = logIn;
        vm.logOut = logOut;

         firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
            $state.go('home.dashboard');
          } else {
            $state.go('login');
          }
        });

        function logIn() {
            FirebaseFactory.logIn(vm.email, vm.password)
        };

        function logOut() {
            FirebaseFactory.logOff()
        };
    };

    


