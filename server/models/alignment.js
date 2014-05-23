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


AlignmentSchema.statics.draw = function(callback){
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
AlignmentSchema.path('name').validate(function(title) {
    return title.length;
}, 'Title cannot be blank');

mongoose.model('Alignment', AlignmentSchema);