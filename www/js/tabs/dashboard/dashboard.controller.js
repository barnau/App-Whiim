(function() {
    'use strict';

    angular
        .module('app')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['FirebaseFactory', '$stateParams', '$state', '$scope'];

    /* @ngInject */
    function DashboardController(FirebaseFactory, $stateParams, $state, $scope) {
        var vm = this;
        vm.title = 'DashboardController';
        vm.test = 'this is a test from DashboardController';
        vm.logOff = logOff;
        vm.saveProfileChanges = saveProfileChanges;
        vm.userDataBaseRef ={};
        vm.loggedInUser = {};


        

        //event that fires on auth state change
        firebase.auth().onAuthStateChanged(function(user) {
            //if user logs in
          if (user) {
            //get user id
            var userId = firebase.auth().currentUser.uid;

            console.log(firebase.auth().currentUser);
            
            //onetime reuqest for logged in users profile info
            return firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
                //assign data to loggedInUser var
                vm.loggedInUser = snapshot.val();
                console.log(vm.loggedInUser);
                $scope.$apply()

            });
            //go to dashboard
            $state.go('home.dashboard');
          } else {

            $state.go('login');
          }
        });


        function saveProfileChanges() {
            var userToEdit = angular.copy(vm.loggedInUser);
            console.log(userToEdit);
            
            var userId = firebase.auth().currentUser.uid;
            console.log(userId);
            
            vm.DataBaseRefToLoggedInUser = firebase.database().ref('users/' + userId);
            vm.DataBaseRefToLoggedInUser.set(userToEdit);
        }

        function logOff() {FirebaseFactory.logOff()}       
        


      
        
        activate();

        ////////////////

        function activate() {
        }
    }
})();