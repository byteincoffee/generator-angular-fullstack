'use strict';

angular.module('<%= scriptAppName %>')
  .factory('<%= classedName %>', function ($resource) {
    return $resource('<%= route %>/:id/:controller', {id: '@_id'}, {
      update: {method: 'PUT'}
    });
  });
