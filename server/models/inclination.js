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
 * Inclination Schema
 */
var InclinationSchema = new Schema({
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
    }]
});

/**
 * Validations
 */
InclinationSchema.path('name').validate(function(name) {
    return name.length;
}, 'Name cannot be blank');

mongoose.model('Inclination', InclinationSchema);
