'use strict';

angular.module('wtApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('admin', {
        templateUrl: 'app/admin/admin.html',
        controller: 'AdminCtrl',
        url: '/admin'
      });
  });
