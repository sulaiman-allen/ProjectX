"use strict";

Catalog.controller('AuthCtrl', function(authService, $location, $timeout) {

  const auth = this;

  auth.test = "test message";

  auth.login = function(email, password) {

    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(`errorCode = ${errorCode}`);
      console.log(`errorMessage = ${errorMessage}`);
      // ...
    }).then(function() {
			authService.checkUserStatus().then(function(resolve) {
    		if (resolve) {
    			$timeout();
    			$location.path('/welcome');
    		}
    	});
    });
  };

  auth.register = function(email, password) {

    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      let errorCode = error.code;
      let errorMessage = error.message;
      console.log(`errorCode = ${errorCode}`);
      console.log(`errorMessage = ${errorMessage}`);
    });

    $location.path('/welcome');
  };

  auth.logout = function() {

  	firebase.auth().signOut().then(function() {
  	  // Sign-out successful.
  	  $timeout();
  	  $location.path('/');
  	}, function(error) {
  	  // An error happened.
  	  console.log("error = ", error);
  	});
  };
})
.service('authService', function() {

  const auth = this;

  auth.checkUserStatus = function() {

	  // check to see if a user is currently signed in
	  return new Promise(function(resolve, reject) {
	  	let user = firebase.auth().currentUser;
		    // User is signed in.
		  if (user) {
		  	resolve(true);
		    // No user is signed in.
		  } else {
		  	console.log("this is failing");
		  	reject(false);
		  }
	  });
	};
});