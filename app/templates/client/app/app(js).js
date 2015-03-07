'use strict';

angular.module('<%= scriptAppName %>', [<%= angularModules %>])
  <% if(filters.ngroute) { %>.config(function ($routeProvider, $locationProvider<% if(filters.auth) { %>, $httpProvider<% } %>) {
    $routeProvider
      .otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode(true);<% if(filters.auth) { %>
    $httpProvider.interceptors.push('authInterceptor');<% } %>
  })<% } %><% if(filters.uirouter) { %>.config(function ($stateProvider, $urlRouterProvider, $locationProvider<% if(filters.auth) { %>, $httpProvider<% } %>) {
    $urlRouterProvider
      .when('/admin', '/admin/dashboard')
      .when('/admin/', '/admin/dashboard')
      .otherwise('/');

    $locationProvider.html5Mode(true);<% if(filters.auth) { %>
    $httpProvider.interceptors.push('authInterceptor');<% } %>
  })<% } %><% if(filters.auth) { %>

  .factory('authInterceptor', function ($q, $cookieStore, $injector) {
    return {
      // Add authorization token to headers
      request: function (config) {
        config.headers = config.headers || {};
        if ($cookieStore.get('token')) {
          config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
        }
        return config;
      },
      // Intercept 401s and redirect you to login
      responseError: function (response) {
        if (response.status === 401) {
          var $state = $injector.get('$state');
          $state.go('login');
          // remove any stale tokens
          $cookieStore.remove('token');
          return $q.reject(response);
        }
        else {
          return $q.reject(response);
        }
      }
    };
  })
  .run(function ($window, $cookieStore, $location) {
    if ($cookieStore.get('state')) {
      var url = $cookieStore.get('state');
      $cookieStore.remove('state');
      if ($location.url() !== url) {
        $window.location.href = url;
      }
    }
  })
  .run(function (notify) {
    notify.config({
      position: 'right',
      duration: 5000
    });
  })
  .run(function () {
    // Tradução GRID
    var defaultTranslation = {
      'Born': 'Criado',
      'Search': 'Buscar',
      'Page': 'Página',
      'First Page': 'Primeira Página',
      'Next Page': 'Próxima Página',
      'Previous Page': 'Página Anterior',
      'Last Page': 'Última Página',
      'Sort': 'Ordenar',
      'No items to display': 'Não há itens para exibir',
      'displayed': 'Exibidos',
      'in total': 'No Total'
    };

    defaultTranslation[TrNgGrid.translationDateFormat] = 'dd/MM/yyyy';

    TrNgGrid.translations['pt-br'] = defaultTranslation;
  })
  .run(function ($rootScope, Auth, $state, $window, $location, SEO, $injector) {
    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$stateChangeStart', function (event, next) {
      Auth.isLoggedInAsync(function (loggedIn) {
        if ((next.authenticate || next.role) && !loggedIn) {
          event.preventDefault();
          $state.go('login');
          return;
        }
        if ((next.role && loggedIn) && !next.role($injector)) {
          event.preventDefault();
          $state.go('main.home');
          return;
        }
      });
    });
    $rootScope.$on('$stateChangeSuccess', function (event, current) {
      SEO.title(current.title || '<%= scriptAppName %>');
      SEO.ogUrl(current.ogUrl || '/');
      SEO.ogTitle(current.ogTitle || '<%= scriptAppName %>');
      SEO.ogDescription(current.ogDescription || '<%= scriptAppName %>');
      if ($window.ga) {
        $window.ga('set', {page: $location.url(), title: (current.title || '<%= scriptAppName %>')});
        $window.ga('send', 'pageview');
      }

    });
  })<% } %>;
