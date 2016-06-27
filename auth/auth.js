"use strict";

Catalog.controller('AuthCtrl', function(authService, Firebase) {

	const auth = this;

	// firebase.onAuth(authService.authDataCallback());

	// var ref = new Firebase("https://catalogr-52a59.firebaseio.com");

	auth.test = "This should be working now";

	auth.doAuth = function(email, password) {

		console.log(`email = ${email}. password = ${password}`);

	};

	auth.register = function(email, password) {

		let ref = 

		ref.createUser({
		  email    : email,
		  password : password
			}, function(error, userData) {
		  if (error) {
		    console.log("Error creating user:", error);
		  } else {
		    console.log("Successfully created user account with uid:", userData.uid);
		  }
		});
	};

})
.service('authService', function() {

	const auth = this;


	auth.authDataCallback = function() {

	};

});