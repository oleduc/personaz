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
 * Alignment Schema
 */
var AlignmentSchema = new Schema({
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
    color: {
        type: String,
        default: 'neutral'
    }
});

/**
 * Validations
 */
AlignmentSchema.path('name').validate(function(title) {
    return title.length;
}, 'Title cannot be blank');

mongoose.model('Alignment', AlignmentSchema);