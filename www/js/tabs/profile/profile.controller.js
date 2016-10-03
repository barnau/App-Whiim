(function() {
    'use strict';

    angular
        .module('app')
        .controller('ProfileController', ProfileController);

    ProfileController.$inject = ['FirebaseFactory', '$scope', '$state', 'toastr'];

    /* @ngInject */
    function ProfileController(FirebaseFactory, $scope, $state, toastr) {
        var vm = this;
        vm.title = 'ProfileController';
        vm.logOff = logOff;
        vm.save = save;
        //user from firebase auth
        vm.authUser = {};
        //user from firebase data to store info not from facebook
        vm.dbUser = {};
        

        

        firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
    
            vm.authUser = user;
           

            return firebase.database().ref('/users/' + user.uid).once('value').then(function(snapshot) {
                        //assign data to dbUser var
                        vm.dbUser = snapshot.val();
                       
                        
                        $scope.$apply()

                    });
            
          } else {

           
            $state.go('login');
          }
        });


        function logOff() {
            
            FirebaseFactory.logOff();
        }

        function save() {
           

            var userToEdit = angular.copy(vm.dbUser);
            vm.DataBaseRefToLoggedInUser = firebase.database().ref('users/' + vm.authUser.uid);
            vm.DataBaseRefToLoggedInUser.set(userToEdit);
            toastr.success('Profile saved');
        }

        activate();

        ////////////////

        function activate() {
        }
    }
})();