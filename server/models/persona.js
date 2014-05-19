/**
 * Created by Olivier Leduc on 30/04/14.
 */
'use strict';

/**
 * Module dependencies.
 */
require('./alignment');
require('./inclination');
require('./rule');
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Alignment = mongoose.model('Alignment'),
    Inclination = mongoose.model('Inclination'),
    Rule = mongoose.model('Rule');


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
        id : String
    }],
    inclinations: [{
        id : String
    }],
    rules: [{
        id : String
    }],
    tasks: [{
        id : String
    }],
    user: {
        id: {
            type: String
        }
    }
});

PersonaSchema.methods.generate = function(callback){
    console.log(Rule);
};

PersonaSchema.methods.drawElement = function(Schema,conditions,callback){
    if(conditions){

    } else {

    }
};

mongoose.model('Persona', PersonaSchema);

function getRandMax(max){return Math.floor((Math.random() * max) + 1)};
