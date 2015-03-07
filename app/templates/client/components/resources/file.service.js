'use strict';

angular.module('wtApp')
  .factory('File', function ($resource) {
    return $resource('/api/files/:id/:controller', {
        id: '@_id'
      },
      {
        update: {method: 'PUT'}
      });
  });
