'use strict';

angular.module('wtApp')
  .factory('User', function ($resource) {
    return $resource('/api/users/:id/:controller', {
      id: '@_id'
    }, {
      changePassword: {
        method: 'PUT',
        params: {
          controller: 'password'
        }
      }, get: {
        method: 'GET',
        params: {
          id: 'me'
        }
      }, update: {
        method: 'PUT'
      },
      query: {
        method: 'GET',
        isArray: true,
        params: {
          controller: 'admin'
        }
      },
      like: {
        method: 'PUT',
        params: {
          controller: 'like'
        }
      },
      dislike: {
        method: 'PUT',
        params: {
          controller: 'dislike'
        }
      }
    });
  });
