/**
 * Created by Olivier Leduc on 25/04/14.
 */
'use strict';

//Setting up route
angular.module('mean.admin').config(['$stateProvider',
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
            .state('dashboard admin', {
                url: '/admin/dashboard',
                templateUrl: 'public/admin/views/dashboard.html',
                resolve: {
                    loggedin: checkLoggedin
                }
            });
    }
]);
