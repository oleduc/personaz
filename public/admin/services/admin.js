'use strict';
console.log('YUNOIRAN');
angular.module('mean.admin').factory('DynamicForm',[function(){
    var that =  {
        reset : function(){
            that.visible= false;
            that.type = '';
            that.fields = {
                short : [],
                long : [],
                links : []
            };
            that.result = {
                action: null,
                    type: null,
                    value: null
            };
        }
    };
    that.reset();
    return that;
}]);