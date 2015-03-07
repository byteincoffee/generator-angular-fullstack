'use strict';

angular.module('wtApp')
  .directive('toTop', function (UI) {
    return {
      restrict: 'A',
      link: function (scope, $elm) {
        $elm.on('click', function () {
          UI.toTop();
        });
      }
    };
  });
