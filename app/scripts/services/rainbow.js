'use strict';

/**
 * @ngdoc service
 * @name rainbowApp.rainbow
 * @description
 * # common
 * Service in the rainbowApp.
 */
angular.module('rainbowApp')
  .service('rainbow', function($q) {

    var exports = {};

    var DEFAULT_DEALER_PORT = 8080,
      DEFAULT_BROKER_PORT = 8081;

    var wsDealer, wsBroker;

    var connectPromise, getFunctionsPromise, executeFunctionsPromises = {};

    var wsDealerConnected, wsBrokerConnected;

    var getFunctionId;

    var wsDealerOnOpen = function(evt) {
      //console.log('wsDealerOnOpen');
      wsDealerConnected = true;
      //console.log(evt);
      resolveConnectPromise();
    };

    var wsDealerOnMessage = function(evt) {
      //console.log('wsDealerOnMessage');
      //console.log(evt);
      var data = JSON.parse(evt.data);
      if (data.id === getFunctionId) {
        getFunctionsPromise.resolve(data.result);
      } else if (executeFunctionsPromises[data.id]) {
        executeFunctionsPromises[data.id].resolve(data.result);
      }
    };

    var wsDealerOnClose = function(evt) {
      //console.log('wsDealerOnClose');
      //console.log(evt);
      wsDealerConnected = false;
    };

    var wsBrokerOnOpen = function(evt) {
      //console.log('wsBrokerOnOpen');
      //console.log(evt);
      wsBrokerConnected = true;
      resolveConnectPromise();
    };

    var wsBrokerOnMessage = function(evt) {
      ////console.log('wsBrokerOnMessage');
      ////console.log(evt);
      var data = JSON.parse(evt.data);
      if (exports.onMessage) {
        exports.onMessage(data);
      }
    };

    var wsBrokerOnClose = function(evt) {
      //console.log('wsBrokerOnClose');
      //console.log(evt);
      wsBrokerConnected = false;
    };

    var resolveConnectPromise = function() {
      if (wsBrokerConnected && wsDealerConnected) {
        connectPromise.resolve();
      }
    }

    var createUniqueId = function() {
      return Date.now();
    };

    exports.disconnect = function() {
      //console.log('TODO disconnect');
    }
    exports.connect = function(ip, dealerPort, brokerPort) {
      connectPromise = $q.defer();
      dealerPort = dealerPort || DEFAULT_DEALER_PORT;
      brokerPort = brokerPort || DEFAULT_BROKER_PORT;
      if (wsDealer || wsBroker) {
        exports.disconnect()
      }
      wsDealer = new WebSocket('ws://' + ip + ':' + dealerPort);
      wsDealer.onopen = wsDealerOnOpen;
      wsDealer.onclose = wsDealerOnClose;
      wsDealer.onmessage = wsDealerOnMessage;

      wsBroker = new WebSocket('ws://' + ip + ':' + brokerPort);
      wsBroker.onopen = wsBrokerOnOpen;
      wsBroker.onclose = wsBrokerOnClose;
      wsBroker.onmessage = wsBrokerOnMessage;

      return connectPromise.promise;
    };

    exports.getFunctions = function() {
      getFunctionsPromise = $q.defer();
      getFunctionId = createUniqueId();

      wsDealer.send(JSON.stringify({
        jsonrpc: "2.0",
        method: "_functions",
        id: getFunctionId
      }));
      return getFunctionsPromise.promise;
    }


    exports.executeFunction = function(methodName, params) {
      var uniqueId = createUniqueId();
      executeFunctionsPromises[uniqueId] = $q.defer();
      //console.log('send');
      wsDealer.send(JSON.stringify({
        jsonrpc: '2.0',
        method: methodName,
        id: uniqueId,
        params: params
      }));

      return executeFunctionsPromises[uniqueId].promise;
    }


    return exports;

  });