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
    }
});

InclinationSchema.statics.draw = function(callback){
    var self = this;
    self.count(function(err,count){
        self.findOne({},{_id:1}).limit(1).skip(Math.floor((Math.random() * count))).exec(function(err,draw){
            if(!err){
                callback(null,draw);
            } else {
                callback(err);
            }
        });
    });
};

/**
 * Validations
 */
InclinationSchema.path('name').validate(function(name) {
    return name.length;
}, 'Name cannot be blank');

mongoose.model('Inclination', InclinationSchema);
