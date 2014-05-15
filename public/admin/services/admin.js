'use strict';

angular.module('mean.admin').factory('DynamicForm',[function(){
    var that =  {
        reset : function(){
            this.type = null;
            this.fields = {};
            this.fields.short = [];
            this.fields.long = [];
            this.fields.links = [];
            this.result = {
                action: null,
                type: null,
                value: null
            };
            this.visible = false;
        }
    };
    that.reset();
    return that;
}]);