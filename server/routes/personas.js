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

    app.post('/alignments', personas.elements.create.alignment);
    app.post('/inclinations', personas.elements.create.inclination);
};