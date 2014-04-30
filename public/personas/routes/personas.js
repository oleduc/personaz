'use strict';

//Setting up route
angular.module('mean.personas').config(['$stateProvider',
    function($stateProvider) {

        //================================================
        // Check if the user is connected
        //================================================
        var checkLoggedin = function($q, $timeout, $http, $location) {
            // Initialize a new promise
            var deferred = $q.defer();

            // Make an AJAX call to check if the user is logged in
            $http.get('/loggedin').success(function(user) {
                // Authenticated
                if (user !== '0')
                    $timeout(deferred.resolve, 0);

                // Not Authenticated
                else {
                    $timeout(function() {
                        deferred.reject();
                    }, 0);
                    $location.url('/login');
                }
            });

            return deferred.promise;
        };

        // states for my app
        $stateProvider
            .state('all personas', {
                url: '/personas',
                templateUrl: 'public/personas/views/list.html',
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .state('generate persona', {
                url: '/articles/generate',
                templateUrl: 'public/personas/views/generate.html',
                resolve: {
                    loggedin: checkLoggedin
                }
            });
    }
]);
