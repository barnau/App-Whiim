(function() {
    'use strict';

    angular
        .module('app')
        .factory('FirebaseFactory', FirebaseFactory);

    FirebaseFactory.$inject = ['$http', 'toastr', '$q', '$state', '$sessionStorage', '$rootScope'];

    

   

    /* @ngInject */
    function FirebaseFactory($http, toastr, $q, $state, $sessionStorage, $rootScope) {

        


        var service = {
            signUp: signUp,
            logIn: logIn,
            logOff: logOff,
            facebookLogIn: facebookLogIn,
            userProfileExists: userProfileExists,
            multipleNotificationsFromUIDExists: multipleNotificationsFromUIDExists,
            returnUserFromDB: returnUserFromDB

        };
        return service;

        ////////////////
        function returnUserFromDB(uid) {

            var defer = $q.defer();
            firebase.database().ref('/users/' + uid).once('value').then(function(snapshot) {
                //assign data to dbUser var
                var result = snapshot.val();

                defer.resolve(result);


            });
            return defer.promise;

        }



        //if user profile exists outside of auth in user table return
        function userProfileExists(uid) {

            var defer = $q.defer();
            var result = false;

            firebase.database().ref('users/' + uid).once('value', function(snapshot) {
                if (snapshot.val() === null) {
                    
                    result = false;


                } else {

                    result = true;
                }

                defer.resolve(result);

            })

            return defer.promise;

        }

        function multipleNotificationsFromUIDExists(ref) {

            var defer = $q.defer();
            var result = false;

            ref.once('value', function(snapshot) {
               var result = snapshot.hasChildren()
               console.log(result);

                defer.resolve(result);

            })

            return defer.promise;

        }


        function signUp(email, password) {
            // Call firebase auth object and execute create user method
            firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
                if (error) {
                    //if error creating new user toast
                    toastr.error(error.message, error.code);
                }
            });
        }

        function logIn(email, password) {
            // Call firebase auth object and execute login
            firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
                toastr.error(error.message, error.code);
            });
        }

        function logOff() {
            firebase.auth().signOut().then(
                function() {
                    toastr.success("We miss you already!")
                    $state.go('login')
                },
                function(error) {
                    toastr.error(error.message);
                });
        }

        function facebookLogIn() {
            var provider = new firebase.auth.FacebookAuthProvider();

            var defer = $q.defer();
            var result = '';

            firebase.auth().signInWithPopup(provider)
                .then(function(result) {
                    
                    $sessionStorage.uid = result.user.uid;
                    console.log('right befor eemit')
                    $rootScope.$emit('userLoggedIn', {uid: result.user.uid});

                    console.log( $sessionStorage.uid);
                    userProfileExists(result.user.uid).then(function(userProfileExists) {
                        if (!userProfileExists) {
                            console.log('user profile doesnt exist yet');
                            var DataBaseRefToLoggedInUser = firebase.database().ref('users/' + firebase.auth().currentUser.uid);

                            DataBaseRefToLoggedInUser.set({
                                displayName: result.user.displayName,
                                email: result.user.email,
                                photoURL: result.user.photoURL,
                                activity: 'Select an activity'

                            });
                            result = 'Created new user';
                            defer.resolve(result);
                        } else {
                            result = 'Returning user';
                            defer.resolve(result);
                        }
                        console.log('hits promise');
                    })
                }).catch(function(error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    // The email of the user's account used.
                    var email = error.email;
                    // The firebase.auth.AuthCredential type that was used.
                    var credential = error.credential;
                    // [START_EXCLUDE]
                    if (errorCode === 'auth/account-exists-with-different-credential') {
                        toastr.error('You have already signed up with a different auth provider for that email.');
                    } else {
                        toastr.error(error);
                    }
                    // [END_EXCLUDE]
                });

            return defer.promise;
        }




    }
})();
