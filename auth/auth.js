"use strict";

Catalog.controller('AuthCtrl', function(authService, $location) {

  const auth = this;

  auth.test = "This should be working now";

  auth.doAuth = function(email, password) {

    console.log(`email = ${email}. password = ${password}`);

  };

  auth.register = function(email, password) {


    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      let errorCode = error.code;
      let errorMessage = error.message;
      console.log(`errorCode = ${errorCode}`);
      console.log(`errorMessage = ${errorMessage}`);
    });
      // ...
    // }).then(function () {
    //   console.log(`User ${email} created with password of ${password}`);
    //   // $location.path("welcome");
    //    $location.path('welcome');
    // });

    $location.path('welcome');

   
  };

})
.service('authService', function() {

  const auth = this;


  auth.authDataCallback = function() {

  };

});