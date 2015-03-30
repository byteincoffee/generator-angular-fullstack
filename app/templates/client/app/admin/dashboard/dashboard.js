'use strict';

angular.module('<%= scriptAppName %>')
  .config(function ($stateProvider) {
    $stateProvider
      .state('admin.dashboard', {
        url: '/dashboard',
        role: function ($injector) {
          return $injector.get('Auth').hasRole('admin');
        },
        views: {
          '': {
            templateUrl: 'app/admin/dashboard/dashboard.html',
            controller: 'DashboardCtrl'
          }
        }

      });
  });
