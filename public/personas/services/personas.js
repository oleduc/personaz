'use strict';

//Personas service used for articles REST endpoint
angular.module('mean.personas').factory('Personas', ['$resource', function($resource) {
    return $resource('personas/:personaId', {
        personaId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);