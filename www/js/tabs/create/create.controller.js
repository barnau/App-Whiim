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
        vm.eventName = '';
        vm.requiredUsers = 0;
        vm.description = ''; 
        vm.category = '';
        vm.createEvent = createEvent;
        vm.uid = $sessionStorage.uid; 


        

        function createEvent(newEvent) {
            if (newEvent.name == null || newEvent.description == null){
                toastr.error("Please provide both a name & description for this event!");
            } else {
            var postEvent = {
                creator: vm.uid,  
                name: newEvent.name, 
                description: newEvent.description, 
                requiredUsers : vm.requiredUsers, 
                category : vm.category,
                timeStamp: Date.now()
                };
            console.log(newEvent);
            toastr.success("New Event Posted!");
            }

            // Get a key for a new event
            var newEventKey = firebase.database().ref().child('events').push().key;
            
            // Write the new post's data simultaneously to the database in 2 places
            var eventUpdates = {};
            eventUpdates['/events/' + newEventKey] = postEvent;
            eventUpdates['/users/' + vm.uid + '/user-events/' + newEventKey] = postEvent;

            return firebase.database().ref().update(eventUpdates);
        }




        activate();

        ////////////////

        function activate() {
        
        }
    }


})();