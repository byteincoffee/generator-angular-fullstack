'use strict';

angular.module('<%= scriptAppName %>')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      });
  });
