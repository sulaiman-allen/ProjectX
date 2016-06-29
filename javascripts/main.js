"use strict";

var Catalog = angular.module('catalog', ['ngRoute']);

Catalog.config(($routeProvider) => {

  firebase.initializeApp({
    apiKey: "AIzaSyCSJtE8Eh9Lx1TylzCIg3xmG-HKY6ybxFk",
    authDomain: "catalogr-52a59.firebaseapp.com",
    databaseURL: "https://catalogr-52a59.firebaseio.com",
    storageBucket: "catalogr-52a59.appspot.com",
  });

  $routeProvider
  .when('/', {
    controller: 'AuthCtrl',
    controllerAs: 'auth',
    templateUrl: '/auth/login.html'
  })
  .when('/welcome', {
  	controller: 'MainCtrl',
  	controllerAs: 'main',
  	templateUrl: '/main/welcome.html'
  })
  .when('/register', {
  	controller: 'AuthCtrl',
  	controllerAs: 'auth',
  	templateUrl: '/auth/register.html'
  });
})
.controller('MainCtrl', function($timeout) { 
	const main = this;

	firebase.database().ref('/').on('value', (snap) => {
	  const data = snap.val();
	  // console.log("data = ", data);
	  main.test = data;
	  // console.log("main.test.media = ", main.test.media);
	  $timeout();
	});

	// Onclick event for setting the ownership of an item true or false in firebase
	main.isOwned = function(id, value) {

		firebase.database().ref(`/media/${id}`).child("owned").set(value);
	};

	// Onclick event for deleting the item from the database
	main.deleteItem = function(id) {

		firebase.database().ref(`/media`).child(id).set(null);
	};

	// Onclick method for setting the type of media for each item
	main.setType = function(id, value) {

		firebase.database().ref(`/media/${id}`).child("mediaType").set(value);
	};

	// Onclick method for editing the current datafield
	main.ClickToEditCtrl = function(media, field) {
	  console.log("media = ", media);
	  media.editorEnabled = !media.editorEnabled;
	  // media.enableEditor();
	  // console.log("media.editorEnabled = ", media.editorEnabled);
	  
	  media.enableEditor = function() {
	  	console.log("enableEditor firing");
	    media.editorEnabled = true;
	    media.editableTitle = field;
	  };
	  
	  media.disableEditor = function() {
	  	console.log("disableEditor firing");
	    media.editorEnabled = false;
	  };
	  
	  media.save = function() {
	  	console.log("save firing");
	  	console.log("field = ", field);
	  	console.log("media.editableTitle = ", media.editableTitle);
	    field = media.editableTitle;
	    console.log("field = ", field);
	    media.disableEditor();
	  };

	  if(media.editorEnabled) {
	 		console.log("editorEnabled = true");
	  	media.enableEditor();
	  } else {
	 		console.log("editorEnabled = false");
	  	media.disableEditor();
	  }
	};
});
// .service('TestJson', function($http) {

// 	const test = this;

// 	test.getJson = function(x) {
// 		$http.get('testjson/geb.json')
// 		.success(function(data) {
// 		  x(data);
// 		});
// 	};
// });