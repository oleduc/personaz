'use strict';

angular.module('mean.admin')
    .controller('AdminController', ['$scope','$stateParams','Global','DynamicForm','Elements','Alignments', function ($scope,$stateParams,Global,DynamicForm,Elements,Alignments) {
        console.log('Admin Controller');
        $scope.global = Global;
        $scope.alignments = [];
        $scope.inclinations = [];
        $scope.rules = [];
        $scope.tasks = [];

        $scope.showForm = function(type){
            DynamicForm.type = type;
            DynamicForm.visible = true;
        };

        $scope.fetch = function(){
            Elements.query(function(elements) {
                $scope.alignments = elements[0];
            });
        };

        $scope.findAlignments = function(){
            Alignments.query(function(alignments){
                $scope.alignments = alignments;
            });
        };

        $scope.findInclinations = function(){

        };
        $scope.findRules = function(){

        };
        $scope.findTasks = function(){

        };
    }])
    .controller('AdminFormController', ['$scope','$stateParams','Global','DynamicForm','Alignments', 'Inclinations', function ($scope,$stateParams,Global,DynamicForm,Alignments,Inclinations) {
        //Generic form controller
        console.log('AdminFormController');

        var Resource = null;
        $scope.global = Global;
        $scope.form = DynamicForm;

        $scope.$watch('form.type',function(type){
            switch(type){
                case 'alignment':
                    Resource = Alignments;
                    $scope.form.fields.short = [
                        {name:'name',type:'text',placeholder:'Name of the alignment'},
                        {name:'color',type:'text',placeholder:'Color of the alignment'}
                    ];
                    $scope.form.fields.long = [{name:'description',rows:2,placeholder:'Description of the alignment'}];
                break;
                case 'inclination':
                    Resource = Inclinations;
                    $scope.form.fields.short = [{name:'name',type:'text',placeholder:'Name of the inclination'}];
                    $scope.form.fields.long = [{name:'description',rows:2,placeholder:'Description of the inclination'}];
                break;
            }
        });

        $scope.submit = function(){
            var models = {};

            for(var fieldType in $scope.form.fields){
                for(var field in $scope.form.fields[fieldType]){
                    models[$scope.form.fields[fieldType][field].name] = $scope.form.fields[fieldType][field].model;
                }
            }
           if(Resource){
               var resource = new Resource(models);
               resource.$save(function(response) {
                   console.log(response);
               });
           }
        };

        $scope.closeForm = function(){
            $scope.form.visible = false;
        };
    }]);