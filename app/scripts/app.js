'use strict';

/**
 * @ngdoc overview
 * @name rainbowClientApp
 * @description
 * # rainbowClientApp
 *
 * Main module of the application.
 */
angular
  .module('rainbowClientApp', [
    'ngMessages',
    'ngRoute',
    'ngSanitize'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
          templateUrl: 'views/main.html',
          controller: 'WebsocketsCtrl',
          controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
