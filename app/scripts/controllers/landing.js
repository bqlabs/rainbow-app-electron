'use strict';

/**
 * @ngdoc function
 * @name bitbloqOffline.controller:LandingCtrl
 * @description
 * # LandingCtrl
 * Controller of the bitbloqOffline
 */
angular.module('rainbowApp')
  .controller('LandingCtrl', function($scope, rainbow) {

    console.log('landing ctrl');
    var mdns = require('mdns-js');


    var landing = this;
    this.services = {};


    this.getType = function(item) {
      return typeof(item);
    }

    this.refreshServices = function() {
      console.log('refresh');
      landing.services = {};
      var browser = mdns.createBrowser();
      browser.on('ready', function() {
        browser.discover();
      });

      browser.on('update', function(data) {
        for (var i = 0; i < data.addresses.length; i++) {

          landing.services[data.addresses[i]] = data;

        }
        $scope.$apply();
        //console.log('data:', data);

      });
    }


    this.showService = function(service) {
      var found = false,
        i = 0;

      while (!found && i < service.type.length) {
        if (service.type[i].name === 'rainbow') {
          found = true;
        }
        i++;
      }
      return found;
    }


    this.connect = function(ip, service) {
      rainbow.connect(ip).then(function() {
        console.log('succes');
        rainbow.onMessage = function(response) {
          console.log('message from server');
          console.log(response);
        };
        rainbow.getFunctions().then(function(response) {
          console.log('getFunctions');
          console.log(response);
          landing.functions = response;
        });
      }, function() {
        console.log('error');
      });
    }

    this.executeFunction = function(methodName, params) {
      // Convert params
      var args = {};
      for (var key in params) {
          args[key] = params[key].value
      }
      console.log('executing function', methodName, args);
      rainbow.executeFunction(methodName, args).then(function(response) {
        console.log('success execute function: ' + methodName);
        console.log(response);
      }, function() {
        console.log('error');
      });
    }


  });
