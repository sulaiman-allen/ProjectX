"use strict";

var Catalog = angular.module('catalog', ['ngRoute','ui.bootstrap', 'angular.filter']);

Catalog.config(($routeProvider) => {

  // To Use this app, create a firebase instance and copy your init here or in a file called
  // "firebase-auth.js" in the "javascripts" folder of the root directory

  // firebase.initializeApp({
  //   apiKey: "#########################################",
  //   authDomain: "#####################################",
  //   databaseURL: "####################################",
  //   storageBucket: "##################################",
  // });

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
.controller('MainCtrl', function($timeout, $uibModal, $scope) { 
  const main = this;

  main.filterType = "";

  main.filteredMedia = function(type){
  	main.filterType = type;
  	// $scope.$apply();
  	$timeout();
  };

  main.testFunc = function() {
  	console.log("this is running");
  };

  main.test = function() {
  	console.log("working");
  };

  main.zork = "glorb";

  main.glorb = "Glorbon";

  firebase.database().ref('/').on('value', (snap) => {
    const data = snap.val();
    console.log("new data added = ", data.media);
    main.test = data;
    // console.log("main.test.media = ", main.test.media);
    $timeout();
  });

  // Onclick event for setting the ownership of an item true or false in firebase
  main.isOwned = function(id, value) {

    firebase.database().ref(`/media/${id}`).child("owned").set(value);
  };


  main.deleteItem = function (id) {

    console.log(`id = ${id}`);
    let modalInstance = $uibModal.open({
      animation: true,
      templateUrl: '/main/deletemodal.html',
      controller: 'ModalInstanceCtrl',
      size: 'sm',
      resolve: {
        id: function () {
          return id;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      console.log(selectedItem);
      }, function () {
          // console.log('Modal dismissed at: ' + new Date());
      });
  };


  // Onclick method for setting the type of media for each item
  main.setType = function(id, value) {

    firebase.database().ref(`/media/${id}`).child("mediaType").set(value);
  };

  main.test = "this is working";

  main.showImage = function(image) { 
    console.log(`image = ${image}`);
    // main.currentImg = image;
    let imageModal = $uibModal.open({
      animation: true,
      templateUrl: '/main/imgmodal',
      controller: 'ModalInstanceCtrl',
      size: 'lg',
      resolve: {
        id: function () {
          // console.log("returning image");
          console.log(`image = ${image}`);
          $scope.currentImg = image;
          // $scope.$apply();
          console.log(`after image set`);
          console.log($scope.currentImg);
          return image;
        }
      }
    });
    imageModal.result.then(function (selectedItem) {
      // console.log(`image = ${image}`);
      // $scope.currentImg = image;
      // $scope.$apply();
      // main.currentImg = image;
      console.log(`selectedItem = ${selectedItem}`);
      }, function () {
          // console.log('Modal dismissed at: ' + new Date());
      });
  };

      
  main.showDescription = function(media) {
    console.log("showDescription");
    media.showDescription = !media.showDescription;
  };

  main.showBook = function(isbn) { 

    console.log(`isbn = ${isbn}`);

    let bookModal = $uibModal.open({
      animation: true,
      templateUrl: '/main/bookmodal',
      controller: 'ModalInstanceCtrl',
      size: 'lg',
      resolve: {
        id: function () {
          console.log(`isbn = ${isbn}`);
          return isbn;
        }
      }
    });
    bookModal.result.then(function (selectedItem) {

      // google.books.load();

      // function initialize() {
      //   var viewer = new google.books.DefaultViewer(document.getElementById('viewerCanvas'));
      //   viewer.load('ISBN:0738531367');
      // }

      // google.books.setOnLoadCallback(initialize);

      console.log(`selectedItem = ${selectedItem}`);
      }, function () {
          // console.log('Modal dismissed at: ' + new Date());
      });
  };

  
  // Onclick method for editing the current datafield
  main.ClickToEditCtrl = function(media, value, id) {
    console.log("media = ", media);
    console.log("value = ", value);
    console.log("id = ", id);
    media.editorEnabled = !media.editorEnabled;
    
    media.enableEditor = function() {
      console.log("enableEditor firing");
      media.editorEnabled = true;
      media.editableTitle = value;
    };
    
    media.disableEditor = function() {
      console.log("disableEditor firing");
      media.editorEnabled = false;
    };
    
    media.save = function() {
      console.log("save firing");
      console.log("value = ", value);
      console.log("media.editableTitle = ", media.editableTitle);
      value = media.editableTitle;
      console.log("secondvalue = ", value);

      firebase.database().ref(`/media/${id}`).child("description").set(value);


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
})
.controller('ModalInstanceCtrl', function ($uibModalInstance, $scope, id) {

  $scope.test = "this should work now";


  $scope.ok = function () {
    firebase.database().ref(`/media`).child(id).set(null);
    $uibModalInstance.dismiss('cancel');
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});