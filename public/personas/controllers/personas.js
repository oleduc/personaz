'use strict';

angular.module('mean.personas')
    .controller('PersonasGenerateController', ['$scope','$stateParams','Global','Personas', function ($scope,$stateParams,Global,Personas) {
        console.log('PersonasGenerateController');
        $scope.global = Global;
        $scope.persona = {};

        $scope.generate = function(){
            Personas.get({},function(persona){
                console.log(persona);
            });
        };
    }]);