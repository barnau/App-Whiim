(function() {
    'use strict';

    angular
        .module('app')
        .controller('NotificationsController', NotificationsController);

    NotificationsController.$inject = ['FirebaseFactory', '$scope', '$sessionStorage', 'toastr', '$firebaseObject', '$firebaseArray', '$ionicPopover'];


    /* @ngInject */
    function NotificationsController(FirebaseFactory, $scope, $sessionStorage, toastr, $firebaseObject, $firebaseArray, $ionicPopover) {
        var vm = this;
        vm.title = 'NotificationsController';
        vm.user = {};
        var uid = $sessionStorage.uid;
        console.log('make sure uid is here --> ' + uid);

        var ref = firebase.database().ref('/notifications/' + uid);
        $scope.notifications = $firebaseArray(ref);
        
        FirebaseFactory.returnUserFromDB(uid).then(function(user) {
                vm.user = user;
                console.log(vm.user);
                
        })

        $ionicPopover.fromTemplateUrl('js/tabs/notifications/notifications.popover.html', {
             scope: $scope,
        }).then(function(popover) {
             $scope.popover = popover;
        });

        activate();

        ////////////////

        function activate() {
        }
    }
})();