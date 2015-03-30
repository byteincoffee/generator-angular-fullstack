'use strict';

angular.module('<%= scriptAppName %>')
  .config(function ($stateProvider) {
    $stateProvider
      .state('admin.<%= name %>', {
        url: '/<%= name %>?id',
        role: function ($injector) {
          return $injector.get('Auth').hasRole('admin');
        },
        reloadOnSearch: false,
        views: {
          '': {
            templateUrl: 'app/admin/<%= name %>/<%= name %>.html',
            controller: '<%= classedName %>Ctrl'
          }
        }
      });
  });
