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
    alignments: [{
        id : String,
        chance : Number
    }],
    inclinations: [{
        id : String,
        chance : Number
    }]
});

/**
 * Validations
 */
RuleSchema.path('name').validate(function(name) {
    return name.length;
}, 'Name cannot be blank');

mongoose.model('Rule', RuleSchema);
