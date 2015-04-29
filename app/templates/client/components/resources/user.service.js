'use strict';

angular.module('maykellApp')
  .factory('User', function ($resource) {
    return $resource('/api/users/:id/:controller', {id: '@_id'}, {
      changePassword: {
        method: 'PUT',
        params: {
          controller: 'password'
        }
      },
      get: {
        method: 'GET',
        params: {
          id: 'me'
        }
      },
      queryAdmin: {
        method: 'GET',
        isArray: true,
        params: {
          controller: 'admin'
        }
      },
      saveAdmin: {
        method: 'POST',
        params: {
          controller: 'admin'
        }
      },
      getAdmin: {
        method: 'GET',
        params: {
          controller: 'admin'
        }
      }
    });
  });
