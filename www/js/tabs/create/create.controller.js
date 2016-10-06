(function() {
    'use strict';

    angular
        .module('app')
        .controller('CreateController', CreateController);

    CreateController.$inject = ['FirebaseFactory', '$stateParams', '$state', '$scope', '$ionicPopover', '$sessionStorage', 'toastr'];

    /* @ngInject */
    function CreateController(FirebaseFactory, $stateParams, $state, $scope, $ionicPopover, $sessionStorage, toastr) {
        var vm = this;
        vm.title = 'CreateController';
        vm.event = {};
        vm.eventName = "";
        var uid = $sessionStorage.uid; 

        

        function createEvent(uid, eventName, timeStamp) {
            var postEvent = {
                creator: uid,  
                name: eventName, 
                timeStamp: 23224
                };
            // Get a key for a new event
            var newEventKey = firebase.database().ref().child('events').push().key;
            
            // Write the new post's data simultaneously in the posts list and the user's post list.
            var eventUpdates = {};
            eventUpdates['/events/' + newPostKey] = postEvent;
            eventUpdates['/user-events/' + uid + '/' + newEventKey] = postEvent;

            return firebase.database().ref().update(eventUpdates);
        }




        activate();

        ////////////////

        function activate() {
        
        }
    }


})();