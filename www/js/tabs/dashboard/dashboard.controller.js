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
        vm.user = {};
        vm.usersByActivity = {};

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

            
            console.log(firebase.auth().currentUser.uid);

            FirebaseFactory.returnUserFromDB(firebase.auth().currentUser.uid).then(function(user) {

                $scope.user = user
                    

                    var ref = firebase.database().ref('/users').orderByChild('activity').equalTo(user.activity);
                    ref.once('value', function(snapshot) {
                    if(snapshot.val() === null) {
                        
                        
                        console.log('fuck you!!!')
                        
                    } else {
                        
                        vm.usersByActivity = snapshot.val();
                        console.log(vm.usersByActivity);
                    }

                    

                })
            })
        }

        


        //figure out how to return users where activities are alike.


        

        $ionicPopover.fromTemplateUrl('js/tabs/dashboard/popover.html', {
             scope: $scope,
         }).then(function(popover) {
             $scope.popover = popover;
         });

         $scope.setActivity = function(activity) {
            
            console.log(activity);
            
            $scope.user.activity = activity;
            console.log(firebase.auth().currentUser.uid);
            vm.DataBaseRefToLoggedInUser = firebase.database().ref('users/' + firebase.auth().currentUser.uid);
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