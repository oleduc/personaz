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
    app.get('/personas', personas.elements.get.persona);

    app.get('/alignments', personas.elements.query.alignments);

    app.post('/alignments', personas.elements.create.alignment);
    app.delete('/alignments', personas.elements.delete.alignment);

    app.get('/inclinations', personas.elements.query.inclinations);

    app.post('/inclinations', personas.elements.create.inclination);
    app.delete('/inclinations', personas.elements.delete.inclination);

    app.get('/rules', personas.elements.query.rules);

    app.post('/rules', personas.elements.create.rule);
    app.delete('/rules', personas.elements.delete.rule);

    app.get('/tasks', personas.elements.query.tasks);

    app.post('/tasks', personas.elements.create.task);
    app.delete('/tasks', personas.elements.delete.task);
};