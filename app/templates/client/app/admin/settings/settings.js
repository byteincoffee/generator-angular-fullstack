'use strict';

angular.module('<%= scriptAppName %>')
  .config(function ($stateProvider) {
    $stateProvider
      .state('admin.settings', {
        url: '/settings',
        templateUrl: 'app/admin/settings/settings.html',
        controller: 'SettingsCtrl',
        authenticate: true
      });
  });
