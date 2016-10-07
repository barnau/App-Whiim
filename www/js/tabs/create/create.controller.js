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
        vm.createEvent = createEvent;
        vm.uid = $sessionStorage.uid; 


        

        function createEvent(newEvent) {
            console.log(newEvent);
            var postEvent = {
                creator: vm.uid,  
                name: newEvent.name, 
                description: newEvent.description, 
                numPeople : vm.requiredUsers, 
                timeStamp: Date.now()
                };
            // Get a key for a new event
            var newEventKey = firebase.database().ref().child('events').push().key;
            
            // Write the new post's data simultaneously in the posts list and the user's post list.
            var eventUpdates = {};
            eventUpdates['/events/' + newEventKey] = postEvent;
            eventUpdates['/users/' + vm.uid + '/user-events/' + newEventKey] = postEvent;

            return firebase.database().ref().update(eventUpdates);
        }

        $ionicPopover.fromTemplateUrl('js/tabs/create/create.popover.html', {
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