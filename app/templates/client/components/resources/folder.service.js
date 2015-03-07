'use strict';

angular.module('wtApp')
  .factory('Folder', function ($resource) {
    return $resource('/api/folders/:id/:controller', {
        id: '@_id'
      },
      {
        update: {method: 'PUT'}
      });
  });
