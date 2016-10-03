(function() {
    'use strict';

    angular
        .module('app')
        .controller('ProfileController', ProfileController);

    ProfileController.$inject = ['FirebaseFactory', '$scope', '$state'];

    /* @ngInject */
    function ProfileController(FirebaseFactory, $scope, $state) {
        var vm = this;
        vm.title = 'ProfileController';
        vm.logOff = logOff;
        vm.save = save;
        // vm.userPhotoUrl = '';
        // vm.userDisplayName = '';
        vm.authUser = {};
        vm.dbUser = {};
        vm.userId = '',

        

        firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
            // vm.userPhotoUrl = user.photoURL;
            // vm.userDisplayName = user.displayName;
            // vm.userId = user.uid;
            vm.authUser = user;
           

            FirebaseFactory.userProfileExists(user.uid).then(function(profileExists) {
                if(profileExists) {

                   
                    return firebase.database().ref('/users/' + user.uid).once('value').then(function(snapshot) {
                        //assign data to dbUser var
                        vm.dbUser = snapshot.val();
                       
                        
                        $scope.$apply()

                    });

                } 
            })
            
          } else {

           
            $state.go('login');
          }
        });


        function logOff() {
            
            FirebaseFactory.logOff();
        }

        function save() {
           

            FirebaseFactory.userProfileExists(vm.authUser.uid).then(function(result) {
                if(result) {
                    

                    var userToEdit = angular.copy(vm.dbUser);
                    vm.DataBaseRefToLoggedInUser = firebase.database().ref('users/' + vm.authUser.uid);
                    vm.DataBaseRefToLoggedInUser.set(userToEdit);
                   
                } else {
                    var DataBaseRefToLoggedInUser = firebase.database().ref('users/' + vm.authUser.uid);
                  
                    DataBaseRefToLoggedInUser.set({
                        displayName: vm.authUser.displayName,
                        email: vm.authUser.email,
                        aboutMe: vm.dbUser.aboutMe
                        
                    });

                }//end else
            })






            

        }

        activate();

        ////////////////

        function activate() {
        }
    }
})();