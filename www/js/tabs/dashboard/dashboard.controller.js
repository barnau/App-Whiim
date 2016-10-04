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
        
        

        FirebaseFactory.returnUserFromDB($sessionStorage.uid).then(function(user) {
                vm.user = user;
                $scope.user = user;
                console.log(vm.user);
        });


        

        $ionicPopover.fromTemplateUrl('js/tabs/dashboard/popover.html', {
             scope: $scope,
         }).then(function(popover) {
             $scope.popover = popover;
         });

         $scope.setActivity = function(activity) {
            

            
            $scope.user.activity = activity;

            vm.DataBaseRefToLoggedInUser = firebase.database().ref('users/' + $sessionStorage.uid);
            vm.DataBaseRefToLoggedInUser.set($scope.user);

            toastr.success('Activity Set');

         };



        function logOff() {FirebaseFactory.logOff()}       
        


      
        
        activate();

        ////////////////

        function activate() {
        }
    }
})();