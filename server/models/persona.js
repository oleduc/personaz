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
    var self = this;
    Alignment.draw(function(err,drawAl){
        self.alignments.push(drawAl);

        Inclination.draw(function(err,drawIn){
            self.inclinations.push(drawIn);

            Rule.draw({
                alignments:self.alignments,
                inclinations:self.inclinations
                }, function(err,draw){
                    callback(err,draw);
            });

        });

    });
};

mongoose.model('Persona', PersonaSchema);


