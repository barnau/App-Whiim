(function() {
    'use strict';

    angular
        .module('app')
        .controller('NotificationsController', NotificationsController);

    NotificationsController.$inject = ['FirebaseFactory', '$scope', '$sessionStorage', 'toastr', '$firebaseObject', '$firebaseArray'];

    /* @ngInject */
    function NotificationsController(FirebaseFactory, $scope, $sessionStorage, toastr, $firebaseObject, $firebaseArray) {
        var vm = this;
        vm.title = 'NotificationsController';
        var uid = $sessionStorage.uid;
        console.log('make sure uid is here --> ' + uid);

        var ref = firebase.database().ref('/notifications/' + uid);
        $scope.notifications = $firebaseArray(ref);
        activate();

        ////////////////

        function activate() {
        }
    }
})();