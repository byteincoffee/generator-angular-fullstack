'use strict';

angular.module('<%= scriptAppName %>')
  .controller('<%= classedName %>Ctrl', function ($scope, <%= classedName %>, $stateParams, $location) {
    $scope.<%= name %>s = <%= classedName %>.query();
    $scope.<%= name %> = {};

    $scope.edit = function (<%= name %>) {
      $scope.ui.loading();
      var <%= name %>Id = (_.isObject(<%= name %>)) ? <%= name %>._id : <%= name %>;
      $location.search('id', <%= name %>Id);
      <%= classedName %>.get({id: <%= name %>Id}, function (<%= name %>) {
        $scope.<%= name %> = <%= name %>;
        $scope.ui.loaded();
      }, function (err) {
        $scope.ui.alert('Erro ao carregaro registro', 'danger');
        $scope.ui.loaded();
        console.log(err);
      });
    };

    $scope.clear = function (form) {
      $scope.<%= name %> = {};
      $location.search('id', null);
      form.$setPristine();
    };

    $scope.save = function (form) {
      if (form.$valid) {
        $scope.submitted = true;
        if ($scope.<%= name %>._id) {
          $scope.update($scope.<%= name %>);
          return;
        }
        $scope.create($scope.<%= name %>, form);
      }
    };

    $scope.update = function (<%= name %>) {
      $scope.ui.loading();
      <%= name %>.$update(function () {
        $scope.submitted = false;
        $scope.ui.loaded();
        var index = _.findIndex($scope.<%= name %>s, {_id: <%= name %>._id});
        $scope.<%= name %>s.splice(index, 1, angular.copy(<%= name %>));
        $scope.ui.alert('Atualizado com sucesso!', 'success');
      }, function (err) {
        $scope.submitted = false;
        $scope.ui.loaded();
        $scope.ui.alert('Não foi possível atualizar o registro', 'danger');
        console.log(err);
      });
    };

    $scope.create = function (<%= name %>New, form) {
      $scope.ui.loading();
      <%= classedName %>.save(<%= name %>New, function (<%= name %>) {
        $scope.clear(form);
        $scope.ui.alert('Adicionado com sucesso!', 'success');
        $scope.submitted = false;
        $scope.ui.loaded();
        $scope.<%= name %>s.push(<%= name %>);
        $location.search('id', <%= name %>._id);
      }, function (err) {
        $scope.submitted = false;
        $scope.ui.loaded();
        $scope.ui.alert('Não foi possível adicionar o registro!', 'danger');
        console.log(err);
      });
    };

    $scope.delete = function (<%= name %>, form) {
      $scope.ui.confirm('Tem certeza que deseja deletar ?', function () {
        <%= name %>.$delete(function () {
          $location.search('id', null);
          var index = _.findIndex($scope.<%= name %>s, {_id: <%= name %>._id});
          $scope.<%= name %>s.splice(index, 1);
          if ($scope.<%= name %>._id === <%= name %>._id) {
            $scope.clear(form);
          }
          $scope.ui.alert('Deletado com sucesso!', 'success');
        }, function (err) {
          $scope.ui.alert('Não foi possível deletar o registro!', 'danger');
          console.log(err);
        });
      });
    };

    if ($stateParams.id) {
      $scope.edit($stateParams.id);
    }
  });
