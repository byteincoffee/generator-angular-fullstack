'use strict';

angular.module('<%= scriptAppName %>')
  .factory('Text', function ($resource) {
    return $resource('/api/texts/:id/:controller', {
        id: '@_id'
      },
      {
        update: {method: 'PUT'}
      });
  });
