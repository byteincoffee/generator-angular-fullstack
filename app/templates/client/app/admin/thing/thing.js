'use strict';

angular.module('<%= scriptAppName %>')
  .config(function ($stateProvider) {
    $stateProvider
      .state('admin.thing', {
        url: '/thing?id',
        role: function ($injector) {
          return $injector.get('Auth').isAdmin();
        },
        reloadOnSearch: false,
        views: {
          '': {
            templateUrl: 'app/admin/thing/thing.html',
            controller: 'ThingCtrl'
          }
        }
      });
  });
