// (function() {
//     'use strict';

    

    angular
        .module('app')
        .controller('DefaultLoginController', DefaultLoginController);

    DefaultLoginController.$inject = ['$state', 'FirebaseFactory', '$stateParams', '$scope', '$firebaseObject', 'toastr', '$localStorage', '$sessionStorage', '$cordovaOauth', '$firebaseAuth', 'firebase'];

    /* @ngInject */
    function DefaultLoginController($state, FirebaseFactory, $stateParams, $scope, $firebaseObject, toastr, $localStorage, $sessionStorage, $cordovaOauth, $firebaseAuth, firebase) {
        
        var vm = this;
        vm.title = 'DefaultLoginController';
        vm.test = 'this is a test from DefaultLoginController';
        vm.logIn = logIn;
        vm.logOut = logOut;
        vm.facebookLogIn = facebookLogIn;
        vm.experimentLogin = experimentLogin; 

        var Firebase = require("firebase");
        var fb = new Firebase("https://simple-chat-b7a83.firebaseapp.com/");

        var auth = $firebaseAuth(fb);

        function experimentLogin() {
          $cordovaOauth.facebook("336850529998000", ["email"]).then(function(result) {
            auth.$authWithOAuthToken("facebook", result.access_token).then(function(authData) {
                console.log(JSON.stringify(authData));
            }, function(error) {
                console.error("ERROR: " + error);
            });
        },     function(error) {
            console.log("ERROR: " + error);
        });
        }


        firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
             //$sessionStorage.uid = user.uid;
            
            // $state.go('tabs.dashboard');
          } else {

            
            $state.go('login');
          }
        });

         function facebookLogIn() {
            
            FirebaseFactory.facebookLogIn().then(
                function() {
                    $state.go('tabs.dashboard');
                }
            );
         }


        function logIn() {
            FirebaseFactory.logIn(vm.email, vm.password);
        }

        function logOut() {
            FirebaseFactory.logOff();
        }
    }

    


