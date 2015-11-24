'use strict';

/**
 * @ngdoc overview
 * @name bitbloqOffline
 * @description
 * # bitbloq-offline
 *
 * Main module of the application.
 */
angular
  .module('rainbowApp', [
    'ngRoute'
  ]).config(['$routeProvider',
    function($routeProvider) {
      console.log('start');
      $routeProvider
        .when('/', {
          templateUrl: 'views/landing.html',
          controller: 'LandingCtrl'
        })
        .otherwise({
          redirectTo: '/'
        });
    }
  ])