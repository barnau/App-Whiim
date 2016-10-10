(function() {
    'use strict';

    angular
        .module('app')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['FirebaseFactory', '$stateParams', '$state', '$scope', '$ionicPopover', '$sessionStorage', 'toastr', '$firebaseArray'];

    /* @ngInject */
    function DashboardController(FirebaseFactory, $stateParams, $state, $scope, $ionicPopover, $sessionStorage, toastr, $firebaseArray) {
        var vm = this;
        vm.title = 'DashboardController';
        vm.test = 'this is a test from DashboardController';
        vm.logOff = logOff;
        vm.category = '';
        vm.cardDestroyed = cardDestroyed;
        vm.cardSwiped = cardSwiped;
        vm.currentCard = [];
        // vm.user = {};
        // vm.pullEventsByCategory = [];
        vm.pullEventsByCategory = pullEventsByCategory;
        vm.events = [];
        
        var uid = $sessionStorage.uid;
        console.log(uid);
        activate();
        pullEventsByCategory();

        //reminder used $scope.user to make scope available in ionic popover

       

        function intiateDeck(events) {
            vm.eventsByCategory = Object.keys(events).map(function(property) {
                        return {key: property, value: events[property] };
            });
            console.log('hello');
            

            vm.currentCard.push( vm.eventsByCategory.pop());

                    


        }

        function pullEventsByCategory() {

            vm.currentCard = [];
            
            var events = {};
            var ref = {};
            if(vm.category === 'Select an Activity') {
                ref = firebase.database().ref('/events');
            } else {
                 ref = firebase.database().ref('/events').orderByChild('category').equalTo(vm.category);
            }
           
            ref.once('value', function(snapshot) {
                if(snapshot.val() === null) {
                    console.log('Error opening events in category');
                } else {
                    events = snapshot.val();

                    intiateDeck(events);
                }
            });

        }
        
        // function pullUsersByActivity() {
        //     vm.currentCard = [];
            
            

        //     FirebaseFactory.returnUserFromDB(uid).then(function(user) {

        //         $scope.user = user
        //         var users = {};

        //             if(user.activity === 'Anything Goes!') {
        //                 var ref = firebase.database().ref('/users').once('value', function(snapshot) {
        //                     if(snapshot.val() === null) {
        //                         console.log('error in returning all users from dashboard controller');
        //                     } else {
        //                         users = snapshot.val();

                                
        //                         intiateDeck(users);
        //                     }
        //                 })

        //             } else {


                        
        //                 //query database to find all user with same activity selected
        //                 var ref = firebase.database().ref('/users').orderByChild('activity').equalTo(user.activity);
        //                 ref.once('value', function(snapshot) {
        //                     if(snapshot.val() === null) {
                                
                                
        //                         console.log('No one found');
                                
        //                     } else {
        //                         //return value from snapshot
        //                         users = snapshot.val();
                                

        //                         intiateDeck(users);
        //                     }
        //                 })
        //             } //end else
                   

        //     })
        // }

       

        

        function cardDestroyed(index) {
            vm.currentCard.splice(index, 1);

            

            if(vm.eventsByCategory.length > 0) {
                vm.currentCard.push( vm.eventsByCategory.pop());
            } else {
                alert('Out of cards');
            }
            
        }

        function cardSwiped(card) {
            //reference to notifications/receiverId/senderId
            console.log(card);
            console.log(uid);
            var ref = firebase.database().ref('notifications/' + card.key + '/' + uid)


            //call firebase factory to see if there is already an active request
            FirebaseFactory.multipleNotificationsFromUIDExists(ref).then(
                function(exists) {
                    if(exists) {
                        //if notification already exists send error message
                       
                        toastr.error('There is already an active request pending.')
                    } else {
                         if (card.key === uid) {
                            toastr.error("You don't have to use whiim to play with your self : (")
                            return;
                        }
                      
                        //set active true and time stamp
                        //grab ref to notifications/card.value.userid
                        var notification = {
                             "active": true,
                            "timeStamp": Date.now(),
                            "ownerName": card.value.ownerName
                        };
                        ref.set(notification);
                        
                        toastr.success("Notification sent to " + card.value.ownerName);
                    } //end else
                }
            )


          
        }


        

        $ionicPopover.fromTemplateUrl('js/tabs/dashboard/popover.html', {
             scope: $scope,
         }).then(function(popover) {
             $scope.popover = popover;
         });

         $scope.setCategory = function(category) {
            
            vm.category = category;

            pullEventsByCategory();

         };



        function logOff() {FirebaseFactory.logOff()}       
        
        function ContentController($scope, $ionicSideMenuDelegate) {
            $scope.toggleLeft = function() {
                $ionicSideMenuDelegate.toggleLeft();
            };
        }

      
        
        activate();

        ////////////////

        function activate() {
            vm.category = 'Select a Category';
        }
    }
})();