'use strict';

angular.module('mean.admin')
    .controller('AdminController', ['$scope','$stateParams','Global','Personas', function ($scope,$stateParams,Global) {
        console.log('Admin Controller');
        $scope.global = Global;
        $scope.alignments = [];
        $scope.inclinations = [];
        $scope.rules = [];
        $scope.tasks = [];

        $scope.fetch = function(){
            console.log('Fetching');
        };

        $scope.findAlignments = function(){

        };
        $scope.findInclinations = function(){

        };
        $scope.findRules = function(){

        };
        $scope.findTasks = function(){

        };
    }])
    .controller('AdminFormController', ['$scope','$stateParams','Global','Personas', function ($scope,$stateParams,Global) {
        console.log('AdminFormController');
        $scope.global = Global;
    }]);