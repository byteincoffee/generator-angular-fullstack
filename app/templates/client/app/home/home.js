'use strict';

angular.module('<%= scriptAppName %>')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main.home', {
        url: '/',
        title: '<%= scriptAppName %>',
        reloadOnSearch: false,
        views: {
          '': {
            templateUrl: 'app/home/home.html',
            controller: 'HomeCtrl'
          }
        }
      });
  });
