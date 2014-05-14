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

            $scope.getFieldByID = function(type,field,_id){
                var result = null;
                $scope[type].every(function(element){
                    if(element._id === _id ){
                        result = element[field];
                        return false;
                    }
                    return true;
                });
                return result;
            };

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
                Rules.query(function(rules) {
                    console.log(rules);
                    $scope.rules = rules;
                });
                Tasks.query(function(tasks) {
                    $scope.tasks = tasks;
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

            function getResourceByType(type){
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
                return Resource;
            }
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

        /**
         * Generic form submit button
         * Will extract models from form object and send to server then update DynamicForm service.
         */
        $scope.submit = function(){
            var models = {};
            //Loop all form files to extract only the proper values to be sent to the server (To limit traffic)
            for(var fType in $scope.form.fields){
                if($scope.form.fields.hasOwnProperty(fType)){

                    //Second level, contains either field object or array of field object
                    $scope.form.fields[fType].forEach(function(object){
                        if(!object.hasOwnProperty('fields')){

                            //object is field object, add to models object
                            models[object.name] = object.model;

                        } else if (typeof object.fields == 'object'){
                            var name = object.name.toLowerCase();
                            //object is array of field objects
                            models[name] = [];
                            object.fields.forEach(function(fieldObj){
                                //fieldObj is added to models object
                                models[name].push({_id:fieldObj._id,chances:fieldObj.model});
                            });
                        } else {
                            throw new Exception('Trying to iterate "$scope.form.fields[fType]", but "object" lacks property "fields" or object.fields is not object');
                        }
                    });

                } else {
                    throw new Exception('Trying to iterate "$scope.form.fields", but lacks property in "fType"');
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