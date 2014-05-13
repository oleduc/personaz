/**
 * Created by Olivier Leduc on 30/04/14.
 */
'use strict';

// Personas routes use persona controller
var personas = require('../controllers/personas');
var authorization = require('./middlewares/authorization');


// Article authorization helpers
var hasAuthorization = function(req, res, next) {
    if (req.article.user.id !== req.user.id) {
        return res.send(401, 'User is not authorized');
    }
    next();
};

module.exports = function(app) {
    app.get('/elements', personas.elements.all);

    app.get('/alignments', personas.elements.get.alignment);
    app.post('/alignments', personas.elements.create.alignment);
    app.delete('/alignments', personas.elements.delete.alignment);

    app.get('/inclinations', personas.elements.get.inclination);
    app.post('/inclinations', personas.elements.create.inclination);
    app.delete('/inclinations', personas.elements.delete.inclination);

    app.get('/rules', personas.elements.get.rule);
    app.post('/rules', personas.elements.create.rule);
    app.delete('/rules', personas.elements.delete.rule);

    app.get('/tasks', personas.elements.get.task);
    app.post('/tasks', personas.elements.create.task);
    app.delete('/tasks', personas.elements.delete.task);
};