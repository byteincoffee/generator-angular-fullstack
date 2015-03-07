'use strict';

angular.module('wtApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      });
  });
