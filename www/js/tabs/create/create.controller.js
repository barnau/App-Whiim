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
        vm.newEvent = {};
        vm.eventName = '';
        vm.requiredUsers = 0;
        vm.description = ''; 
        vm.createEvent = createEvent;
        vm.uid = $sessionStorage.uid; 
        $scope.newEvent = {};
        var userInfo = {};

        activate();


        function createEvent() {
            if ($scope.newEvent.name === null && newEvent.description === null){
                toastr.error('Please enter a name and description for your event!');
            } else {

            console.log(userInfo);
            // var postEvent = {
            //     creator: $scope.newEvent.uid,  
            //     name: $scope.newEvent.name, 
            //     description: newEvent.description, 
            //     requiredUsers : newEvent.requiredUsers, 
            //     category : newEvent.category,
            //     timeStamp: Date.now()
            //     };

            $scope.newEvent.ownerId = $sessionStorage.uid;
            $scope.newEvent.timeStamp = Date.now();
            $scope.newEvent.photoURL = userInfo.photoURL;
            $scope.newEvent.ownerName = userInfo.displayName;
            console.log($scope.newEvent);
            

            //Get a key for a new event
            var newEventKey = firebase.database().ref().child('events').push().key;
            
            // Write the new post's data simultaneously to the database in 2 places
            var eventUpdates = {};
            eventUpdates['/events/' + newEventKey] = $scope.newEvent;
            eventUpdates['/users/' + vm.uid + '/user-events/' + newEventKey] = $scope.newEvent;
                
                toastr.success('Your event has been posted!');

            return firebase.database().ref().update(eventUpdates);
                }
        }

        $ionicPopover.fromTemplateUrl('js/tabs/create/create.popover.html', {
             scope: $scope,
         }).then(function(popover) {
             $scope.popover = popover;
         });

         $scope.setCategory = function(category) {
            toastr.success('Category Set');
            $scope.newEvent.category = category;
            console.log($scope.newEvent.category);
         };

      

       




        

        ////////////////

        function activate() {
            FirebaseFactory.returnUserFromDB($sessionStorage.uid).then(function(user) {
                userInfo = user;
            });
        
        }
    }


})();