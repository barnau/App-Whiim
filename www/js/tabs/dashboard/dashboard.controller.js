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
        vm.cardDestroyed = cardDestroyed;
        vm.cardSwiped = cardSwiped;
        vm.currentCard = [];
        vm.user = {};
        vm.usersByActivity = [];
        
        var uid = $sessionStorage.uid;
        console.log(uid);
        pullUsersByActivity();

        //reminder used $scope.user to make scope available in ionic popover

       

        function intiateDeck(users) {
            vm.usersByActivity = Object.keys(users).map(function(property) {
                        return {key: property, value: users[property] };
            });

            

            vm.currentCard.push( vm.usersByActivity.pop());

                    


        }


        
        function pullUsersByActivity() {
            vm.currentCard = [];
            
            

            FirebaseFactory.returnUserFromDB(uid).then(function(user) {

                $scope.user = user
                var users = {};

                    if(user.activity === 'any') {
                        var ref = firebase.database().ref('/users').once('value', function(snapshot) {
                            if(snapshot.val() === null) {
                                console.log('error in returning all users from dashboard controller');
                            } else {
                                users = snapshot.val();

                                
                                intiateDeck(users);
                            }
                        })

                    } else {


                        
                        //query database to find all user with same activity selected
                        var ref = firebase.database().ref('/users').orderByChild('activity').equalTo(user.activity);
                        ref.once('value', function(snapshot) {
                            if(snapshot.val() === null) {
                                
                                
                                console.log('No one found');
                                
                            } else {
                                //return value from snapshot
                                users = snapshot.val();
                                

                                intiateDeck(users);
                            }
                        })
                    } //end else
                   

            })
        }

       

        

        function cardDestroyed(index) {
            vm.currentCard.splice(index, 1);

            

            if(vm.usersByActivity.length > 0) {
                vm.currentCard.push( vm.usersByActivity.pop());
            } else {
                alert('Out of cards');
            }
            
        }

        function cardSwiped(card) {
            //reference to notifications/receiverId/senderId
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
                            "displayName": $scope.user.displayName
                        };
                        ref.set(notification);
                        
                        toastr.success("Notification sent to " + card.value.displayName);
                    } //end else
                }
            )


          
        }


        

        $ionicPopover.fromTemplateUrl('js/tabs/dashboard/popover.html', {
             scope: $scope,
         }).then(function(popover) {
             $scope.popover = popover;
         });

         $scope.setActivity = function(activity) {
            
            
            
            $scope.user.activity = activity;
            
            vm.DataBaseRefToLoggedInUser = firebase.database().ref('users/' + uid);
            vm.DataBaseRefToLoggedInUser.set($scope.user);

            

            pullUsersByActivity();

         }



        function logOff() {FirebaseFactory.logOff()}       
        


      
        
        activate();

        ////////////////

        function activate() {
        }
    }
})();