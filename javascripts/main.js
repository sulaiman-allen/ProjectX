"use strict";

var Catalog = angular.module('catalog', ['ngRoute','ui.bootstrap', 'angular.filter']);

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
.controller('MainCtrl', function($timeout, $uibModal, $scope) { 
  const main = this;

  main.filterType = "Movie";

  main.filteredMedia = function(type){
  	main.filterType = type;
  };

  main.test = function() {
  	console.log("working");
  };

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

      google.books.load();

      function initialize() {
        var viewer = new google.books.DefaultViewer(document.getElementById('viewerCanvas'));
        viewer.load('ISBN:0738531367');
      }

      google.books.setOnLoadCallback(initialize);

      console.log(`selectedItem = ${selectedItem}`);
      }, function () {
          // console.log('Modal dismissed at: ' + new Date());
      });
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