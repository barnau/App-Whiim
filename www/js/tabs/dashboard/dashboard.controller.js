(function() {
    'use strict';

    angular
        .module('app')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['FirebaseFactory', '$stateParams', '$state', '$scope', '$ionicPopover', '$sessionStorage', 'toastr'];

    /* @ngInject */
    function DashboardController(FirebaseFactory, $stateParams, $state, $scope, $ionicPopover, $sessionStorage, toastr) {
        var vm = this;
        vm.title = 'DashboardController';
        vm.test = 'this is a test from DashboardController';
        vm.logOff = logOff;
        vm.cardDestroyed = cardDestroyed;
        vm.cardSwiped = cardSwiped;
        vm.user = {};
        vm.usersByActivity = {};
        var uid = firebase.auth().currentUser.uid;

        //reminder used $scope.user to make scope available in ionic popover

        FirebaseFactory.returnUserFromDB(firebase.auth().currentUser.uid).then(
            function(user) {
                if(user) {
                    $scope.user = user;
                } else {
                    toastr.error("No user logged in.");
                }

            }
        )


        
        function pullUsersByActivity() {

            
            

            FirebaseFactory.returnUserFromDB(uid).then(function(user) {

                $scope.user = user
                    

                    var ref = firebase.database().ref('/users').orderByChild('activity').equalTo(user.activity);
                    ref.once('value', function(snapshot) {
                    if(snapshot.val() === null) {
                        
                        
                        console.log('No one found');
                        
                    } else {
                        
                        vm.usersByActivity = snapshot.val();
                        
                    }

                    

                })
            })
        }

        

        function cardDestroyed(id) {

            console.log(id + ": card destroyed")
            console.log(vm.usersByActivity);
            delete vm.usersByActivity.id;
            console.log(vm.usersByActivity);
        }

        function cardSwiped(id) {
            console.log(id + ": card swiped");
        }


        

        $ionicPopover.fromTemplateUrl('js/tabs/dashboard/popover.html', {
             scope: $scope,
         }).then(function(popover) {
             $scope.popover = popover;
         });

         $scope.setActivity = function(activity) {
            
            
            
            $scope.user.activity = activity;
            
            vm.DataBaseRefToLoggedInUser = firebase.database().ref('users/' + uid);
            vm.DataBaseRefToLoggedInUser.set($scope.user);

            

            pullUsersByActivity();

         }



        function logOff() {FirebaseFactory.logOff()}       
        


      
        
        activate();

        ////////////////

        function activate() {
        }
    }
})();