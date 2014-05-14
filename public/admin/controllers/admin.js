'use strict';

angular.module('mean.admin')
    .controller('AdminController', [
        '$scope',
        '$stateParams',
        'Global',
        'DynamicForm',
        'Elements',
        'Alignments',
        'Inclinations',
        'Rules',
        'Tasks',
        function ($scope,$stateParams,Global,DynamicForm,Elements,Alignments,Inclinations,Rules,Tasks) {
            console.log('Admin Controller');
            $scope.global = Global;
            $scope.form = DynamicForm;

            $scope.alignments = [];
            $scope.inclinations = [];
            $scope.rules = [];
            $scope.tasks = [];

            $scope.showForm = function(type){
                DynamicForm.reset();
                $scope.form.type = type;
                $scope.form.visible = true;
            };

            $scope.$watch('form.result.value',function(){
                if($scope.form.result.action === 'add'){
                    $scope[$scope.form.type].push($scope.form.result.value);
                }
                DynamicForm.reset();
            });

            $scope.deleteElement = function(type,_id){
                var Resource = null;
                switch (type){
                    case 'alignments':
                        Resource = Alignments;
                    break;
                    case 'inclinations':
                        Resource = Inclinations;
                    break;
                    case 'rules':
                        Resource = Rules;
                    break;
                    case 'tasks':
                        Resource = Tasks;
                    break;
                }
                for(var index in $scope[type]){
                    if($scope[type][index]._id === _id){
                        $scope[type][index].$delete({_id:_id});
                        $scope[type].splice(index,1);
                    }
                }
            };

            $scope.fetch = function(){
                Alignments.query(function(alignments) {
                    $scope.alignments = alignments;
                });
                Inclinations.query(function(inclinations) {
                    $scope.inclinations = inclinations;
                });
            };

            $scope.fetchElements = function(){
                Elements.query(function(elements) {
                    elements.push({});
                    console.log(elements);
                    $scope.alignments = elements[0];
                    $scope.inclinations = elements[1];
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
    .controller('AdminFormController', ['$scope','$stateParams','Global','DynamicForm','Alignments', 'Inclinations','Rules', function ($scope,$stateParams,Global,DynamicForm,Alignments,Inclinations,Rules) {
        //Generic form controller
        console.log('AdminFormController');

        var Resource = null;

        $scope.global = Global;
        $scope.form = DynamicForm;

        $scope.$watch('form.type',function(type){
            switch(type){
                case 'alignments':
                    Resource = Alignments;
                    $scope.form.fields.short = [
                        {name:'name',type:'text',placeholder:'Name of the alignment'},
                        {name:'color',type:'text',placeholder:'Color of the alignment'}
                    ];
                    $scope.form.fields.long = [{name:'description',rows:2,placeholder:'Description of the alignment'}];
                break;
                case 'inclinations':
                    Resource = Inclinations;
                    $scope.form.fields.short = [{name:'name',type:'text',placeholder:'Name of the inclination'}];
                    $scope.form.fields.long = [{name:'description',rows:2,placeholder:'Description of the inclination'}];
                break;
                case 'rules':
                    Resource = Rules;
                    $scope.form.fields.short = [{name:'name',type:'text',placeholder:'Name of the rule'}];
                    $scope.form.fields.long = [{name:'description',rows:2,placeholder:'Description of the rule'}];
                    $scope.form.fields.links = [
                        {
                            name:'Alignments',
                            fields: $scope.$parent.alignments
                        },
                        {
                            name:'Inclinations',
                            fields: $scope.$parent.inclinations
                        }
                    ];
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

               resource.$save(function(element) {
                   $scope.form.result = {
                       action : 'add',
                       value : element
                   };
               });
           }
        };

        $scope.closeForm = function(){
            DynamicForm.reset();
        };
    }]);