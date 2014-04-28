'use strict';

var path = require('path');
var rootPath = path.normalize(__dirname + '/../../..');

module.exports = {
    root: rootPath,
    port: process.env.PORT || 3000,
    db: process.env.MONGOHQ_URL,
    templateEngine: 'swig',

    // The secret should be set to a non-guessable string that
    // is used to compute a session hash
    sessionSecret: '?U*I5r&?%R76h8756gt&?%34cdv7e6j*(6h9674cdxg76%G&?SDF',
    // The name of the MongoDB collection to store sessions in
    sessionCollection: 'sessions'
};
