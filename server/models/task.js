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
    conditions: {
        alignments: [{
            id : String,
            chances : Number
        }],
        inclinations: [{
            _id : String,
            chances : Number
        }],
        rules: [{
            _id : String,
            chances : Number
        }]
    }
});

/**
 * Validations
 */
TaskSchema.path('description').validate(function(description) {
    return description.length;
}, 'Description cannot be blank');

mongoose.model('Task', TaskSchema);
