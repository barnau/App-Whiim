(function() {
    'use strict';

    angular
        .module('app')
        .controller('ProfileController', ProfileController);

    ProfileController.$inject = ['FirebaseFactory', '$scope', '$state', 'toastr', '$sessionStorage'];

    /* @ngInject */
    function ProfileController(FirebaseFactory, $scope, $state, toastr, $sessionStorage) {
        var vm = this;
        vm.title = 'ProfileController';
        vm.logOff = logOff;
        vm.save = save;
        //user from firebase auth
        vm.user = {};
        
        FirebaseFactory.returnUserFromDB($sessionStorage.uid).then(function(user) {
                vm.user = user;
                console.log(vm.user);
                
        })
        

        // firebase.auth().onAuthStateChanged(function(user) {
        //   if (user) {
    
        //     vm.authUser = user;
           

        //     firebase.database().ref('/users/' + user.uid).once('value').then(function(snapshot) {
        //                 //assign data to dbUser var
        //                 vm.dbUser = snapshot.val();
                       
                        
        //                 $scope.$apply()

        //             });
            
        //   } else {

           
        //     $state.go('login');
        //   }
        // });


        function logOff() {
            
            FirebaseFactory.logOff();
        }

        function save() {
           

            var userToEdit = angular.copy(vm.user);

            userToEdit.aboutMe = vm.user.aboutMe;
            console.log(userToEdit);
            vm.DataBaseRefToLoggedInUser = firebase.database().ref('users/' + $sessionStorage.uid);
            vm.DataBaseRefToLoggedInUser.set(userToEdit);
            toastr.success('Profile saved');
        }

        activate();

        ////////////////

        function activate() {
        }
    }
})();