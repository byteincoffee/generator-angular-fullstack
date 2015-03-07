'use strict';

angular.module('wtApp')
        .config(function ($stateProvider) {
            $stateProvider
                    .state('main.home', {
                        url: '/',
                        title: 'wt.com',
                        reloadOnSearch: false,
                        views: {
                            '': {
                                templateUrl: 'app/home/home.html',
                                controller: 'HomeCtrl'
                            }
                        }
                    });
        });