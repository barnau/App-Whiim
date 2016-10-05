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
        // var uid = firebase.auth().currentUser.uid;
        var uid = $sessionStorage.uid;
        console.log(uid);
        pullUsersByActivity();

        //reminder used $scope.user to make scope available in ionic popover

        // FirebaseFactory.returnUserFromDB(firebase.auth().currentUser.uid).then(
        //     function(user) {
        //         if(user) {
        //             $scope.user = user;
        //         } else {
        //             toastr.error("No user logged in.");
        //         }

        //     }
        // )

        function intiateDeck(users) {
            vm.usersByActivity = Object.keys(users).map(function(property) {
                        return {key: property, value: users[property] };
            });

            console.log(vm.usersByActivity)

            vm.currentCard.push( vm.usersByActivity.pop());

                    console.log(vm.currentCard);


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

                                console.log('all activities ' + users);
                                console.log(users);
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
                                console.log('users from one activity group ' + users);
                                console.log(users);

                                intiateDeck(users);
                            }
                        })
                    } //end else
                    //turn object into array
                    // vm.usersByActivity = Object.keys(users).map(function(property) {
                    //     return {key: property, value: users[property] };
                    // });

                    // console.log(vm.usersByActivity);

                    // //take item from Users with like activities array and push in to current card.
                    // vm.currentCard.push( vm.usersByActivity.pop());

                    // console.log(vm.currentCard);

            })
        }

       

        

        function cardDestroyed(index) {
            vm.currentCard.splice(index, 1);

            console.log('card destroyed ' + vm.currentCard);

            if(vm.usersByActivity.length > 0) {
                vm.currentCard.push( vm.usersByActivity.pop());
            } else {
                alert('Out of cards');
            }
            
        }

        function cardSwiped(id) {
            console.log("Implement send a notification.");
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
        
        function ContentController($scope, $ionicSideMenuDelegate) {
            $scope.toggleLeft = function() {
                $ionicSideMenuDelegate.toggleLeft();
            };
        }

      
        
        activate();

        ////////////////

        function activate() {

        }
    }
})();