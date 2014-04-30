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
}]).factory('Alignments', ['$resource', function($resource) {
        return $resource('alignments/:alignmentId', {
            personaId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }]).factory('Inclinations', ['$resource', function($resource) {
        return $resource('inclinations/:inclinationId', {
            personaId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }]).factory('Rules', ['$resource', function($resource) {
        return $resource('rules/:rulesId', {
            personaId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }]).factory('Tasks', ['$resource', function($resource) {
        return $resource('tasks/:taskId', {
            personaId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }]);
