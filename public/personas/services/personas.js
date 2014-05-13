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
            elID: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }]).factory('Inclinations', ['$resource', function($resource) {
        return $resource('inclinations/:inclinationId', {
            elID: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }]).factory('Rules', ['$resource', function($resource) {
        return $resource('rules/:rulesId', {
            elID: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }]).factory('Tasks', ['$resource', function($resource) {
        return $resource('tasks/:taskId', {
            elID: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }]).factory('Elements', ['$resource', function($resource) {
        return $resource('elements/:elementId', {
            elID: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }]);
