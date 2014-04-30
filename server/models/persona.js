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
 * Persona Schema
 */
var PersonaSchema = new Schema({
    name: {
        type: String,
        default: 'John Smith',
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
    }],
    tasks: [{
        id : String,
        chance : Number
    }],
    user: {
        id: {
            type: String
        }
    }
});

mongoose.model('Persona', PersonaSchema);
