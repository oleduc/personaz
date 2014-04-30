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
 * Task Schema
 */
var TaskSchema = new Schema({
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
    }],
    rules: [{
        id : String,
        chance : Number
    }]
});

/**
 * Validations
 */
TaskSchema.path('description').validate(function(description) {
    return description.length;
}, 'Description cannot be blank');

mongoose.model('Task', TaskSchema);
