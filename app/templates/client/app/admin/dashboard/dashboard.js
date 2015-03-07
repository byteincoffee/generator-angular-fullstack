'use strict';

angular.module('wtApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('admin.dashboard', {
        url: '/dashboard',
        role: function ($injector) {
          return $injector.get('Auth').isAdmin();
        },
        views: {
          '': {
            templateUrl: 'app/admin/dashboard/dashboard.html',
            controller: 'DashboardCtrl'
          }
        }

      });
  });
