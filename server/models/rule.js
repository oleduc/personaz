/**
 * Created by Olivier Leduc on 30/04/14.
 */
'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * Rule Schema
 */
var RuleSchema = new Schema({
    name: {
        type: String,
        default: '',
        trim: true
    },
    description: {
        type: String,
        default: '',
        trim: true
    },
    conditions: {
        alignments: [{
            _id : String,
            chances : Number
        }],
        inclinations: [{
            _id : String,
            chances : Number
        }]
    }
});

RuleSchema.statics.draw = function(parents,callback){
    var self = this;
    //var rules = [];
    if(typeof parents === 'function'){
        callback = parents;
    }
    if(parents.hasOwnProperty('alignments') && parents.hasOwnProperty('inclinations')){

        var query = {};
        /*
        for(var condition in parents) {
            query['conditions.'+condition] = {
                $elemMatch:{
                    _id:parents[condition][0]._id,
                    chances:{$gt:0}
                }
            };
        }*/

        self.find(query ,function(err,result){
            buildProbabilityArray(parents,result);
            callback(null,result);
        });
    } else {
        callback('Requires parents argument contains "alignments" and "inclinations" to draw');
    }
    function buildProbabilityArray(parents,rules){
        console.log(parents);
        rules.forEach(function(rule){
            console.log(rule,rule.conditions.inclinations,rule.conditions.alignments);
        });
    }
};

/**
 * Validations
 */
RuleSchema.path('name').validate(function(name) {
    return name.length;
}, 'Name cannot be blank');

mongoose.model('Rule', RuleSchema);
