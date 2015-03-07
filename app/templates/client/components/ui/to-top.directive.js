'use strict';

angular.module('<%= scriptAppName %>')
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
