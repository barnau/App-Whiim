(function() {
    'use strict';

    angular
        .module('app')
        .controller('ChatController', ChatController);

    ChatController.$inject = ['FirebaseFactory', '$scope', '$sessionStorage', 'toastr', '$firebaseObject', '$firebaseArray', '$ionicPopover', '$ionicModal'];

    /* @ngInject */
    function ChatController(FirebaseFactory, $scope, $sessionStorage, toastr, $firebaseObject, $firebaseArray, $ionicPopover, $ionicModal) {
        var vm = this;
        vm.title = 'ChatController';
        vm.openChat = openChat;
        var wholeGroupRepresentation = [];

        activate();

        function openChat(thisChat) {
            alert("Chat opening");
            var groupId = thisChat.$id;
            console.log(groupId);
            var groupElements = ['chats', 'messages', 'users'];
            

            $scope.wholeGroupRepresentation = groupElements.map(function(e) {
                var rObj = {};
                rObj[e] = $firebaseArray(firebase.database().ref('/groups/' + e + '/' + groupId));
                return rObj;
            })


            console.log($scope.wholeGroupRepresentation);

            $scope.popover.show($event)

        }

        $ionicPopover.fromTemplateUrl('js/tabs/chat/chat.html', {
             scope: $scope,
         }).then(function(popover) {
             $scope.popover = popover;
         });

        function activate() {
            // FirebaseFactory.returnUserFromDB($sessionStorage.uid).then(
            //     function(result) {
            //         vm.chatrooms =  $firebaseArray(result.groups);
                    

            //     }
            // )

            var chatroomsRef = firebase.database().ref('/users/' + $sessionStorage.uid + '/groups');

            vm.chatrooms = $firebaseArray(chatroomsRef);

        }

        
          $ionicModal.fromTemplateUrl('js/tabs/chat/chat.feed.html', {
            scope: $scope,
            animation: 'slide-in-up'
          }).then(function(modal) {
            $scope.modal = modal;
          });
          $scope.openModal = function() {
            $scope.modal.show();
          };
          $scope.closeModal = function() {
            $scope.modal.hide();
          };
          // Cleanup the modal when we're done with it!
          $scope.$on('$destroy', function() {
            $scope.modal.remove();
          });
          // Execute action on hide modal
          $scope.$on('modal.hidden', function() {
            // Execute action
          });
          // Execute action on remove modal
          $scope.$on('modal.removed', function() {
            // Execute action
          });
        
    }
})();