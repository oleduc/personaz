'use strict';
console.log('YUNOIRAN');
angular.module('mean.admin').factory('DynamicForm',[function(){
    return {
        visible: false,
        type: '',
        fields: {
            short : [],
            long : [],
            links : []
        }
    }
}]);