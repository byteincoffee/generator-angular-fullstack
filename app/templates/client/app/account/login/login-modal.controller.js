'use strict';

angular.module('<%= scriptAppName %>')
  .controller('LoginModalCtrl', function ($scope, $modalInstance, $controller) {
    angular.extend(this, $controller('LoginCtrl', {$scope: $scope}));
    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  });
