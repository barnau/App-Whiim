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
        vm.remove = remove;
        vm.add = add;
        var notifsRef = firebase.database().ref('/notifications/' + uid);
        var groups = firebase.database().ref('/groups');
        var defaultNumUsers = 2;
        vm.notifications = $firebaseArray(notifsRef);
        var loggedInUser = firebase.auth()
        


         function remove(i) {
            vm.notifications.$loaded().then(
                function(notifications) {
                    notifications.$remove(i);
                }
            )
        }


        function add(note, index) {
            var requestingUserName = note.displayName;
            var requestingUserId = note.$id;
            var acceptingUserName = $sessionStorage.displayName;
            var acceptingUserId = $sessionStorage.uid;
            var title = "Chat between " + requestingUserName + " and " + acceptingUserName
            console.log("acceptingUserId : " + acceptingUserId);
            console.log("requestingUserId : " + requestingUserId);


            var newChatObj = {
                lastMessage: "",
                numberOfUsers: defaultNumUsers,
                timeStamp: Date.now(),
                title: title
            };

           var requestingUser = { name: requestingUserName};
           var acceptingUser = {name: acceptingUserName};
            
           var newGroupKey = firebase.database().ref('groups').child('chats').push().key;

           var updates = {};
           updates['/groups/chats/' + newGroupKey ] = newChatObj;
           updates['groups/users/' + newGroupKey + '/' + requestingUserId  ] = { name: requestingUserName};
           updates['groups/users/' + newGroupKey + '/' + acceptingUserId  ] = {name: acceptingUserName};

           updates['users/' + requestingUserId + '/groups/' + newGroupKey ] = { title: title, key: newGroupKey };
           updates['users/' + acceptingUserId + '/groups/' + newGroupKey ] = { title: title, key: newGroupKey };
           
           

           firebase.database().ref().update(updates).then(
                function() {
                    toastr.success("You can now chat with " + requestingUserName + ".");
                    remove(index);
                },
                function() {
                    toastr.error("There was a problem adding this info to our database.")
                }
            )

           
            


            
            // console.log(newGroupKey);
        }

        $ionicPopover.fromTemplateUrl('js/tabs/notifications/notifications.popover.html', {
                 scope: $scope,
            }).then(function(popover) {
                 $scope.popover = popover;
            });

        $scope.setRequestingId = function(id) {
            FirebaseFactory.returnUserFromDB(id).then(function(requestor) {

                $scope.requestor = requestor;
                console.log($scope.requestor);
            })
            
        }



        
    }
})();