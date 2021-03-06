'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Persona = mongoose.model('Persona'),
    Alignment = mongoose.model('Alignment'),
    Inclination = mongoose.model('Inclination'),
    Rule = mongoose.model('Rule'),
    Task = mongoose.model('Task');

/**
 * Find article by id
 */
exports.elements = {
    all : function (req,res){
        //Todo: Cleanup callback hell
        Alignment.find({},function(err,alignments){
            if(!err){
                Inclination.find({},function(err,inclinations){
                    if(!err){
                        Rule.find({},function(err,rules){
                            if(!err){
                                Task.find({},function(err,tasks){
                                    if(!err){
                                        res.jsonp([
                                            alignments,
                                            inclinations,
                                            rules,
                                            tasks
                                        ]);
                                    } else {
                                        res.send(500);
                                    }
                                });
                            } else {
                                res.send(500);
                            }
                        });
                    } else {
                        res.send(500);
                    }
                });
            } else {
                res.send(500);
            }
        });
    },
    query: {
        alignments   : function(req,res){
            getElements(Alignment,{},res);
        },
        inclinations : function(req,res){
            getElements(Inclination,{},res);
        },
        rules        : function(req,res){
            getElements(Rule,{},res);
        },
        tasks        : function(req,res){
            getElements(Task,{},res);
        }
    },
    get    : {
        persona     : function(req,res){
            if(req.query._id){
                //Generate
                console.log(req.query);
            } else {
                var persona = new Persona();
                persona.generate(function(err){
                    if(!err){
                        res.jsonp(persona);
                    }
                });
            }
        }
    },
    create : {
        alignment   : function(req,res){
            createElement(Alignment,req.body,res);
        },
        inclination : function(req,res){
            createElement(Inclination,req.body,res);
        },
        rule        : function(req,res){
            createElement(Rule,req.body,res);
        },
        task        : function(req,res){
            createElement(Task,req.body,res);
        }
    },
    delete : {
        alignment   : function(req,res){
            deleteElement(Alignment,req.query._id,res);
        },
        inclination : function(req,res){
            deleteElement(Inclination,req.query._id,res);
        },
        rule        : function(req,res){
            deleteElement(Rule,req.query._id,res);
        },
        task        : function(req,res){
            deleteElement(Task,req.query._id,res);
        }
    }
};

/*jslint latedef:false*/
function getElements(Schema,by,res){
    Schema.find(by,function(err,elements){
        if(!err){
            res.jsonp(elements);
        } else {
            res.send(500);
        }
    });
}

function deleteElement(Schema, id, res){
    Schema.findByIdAndRemove(id,function(err){
        if (err) {
            return res.jsonp(500,{
                errors: err.errors
            });
        } else {
            res.send(200);
        }
    });
}

function createElement(Schema,document,res){
    var element = new Schema(document);

    element.save(function(err) {
        if (err) {
            return res.jsonp( {
                errors: err.errors,
                element: element
            });
        } else {
            res.jsonp(element);
        }
    });
}
