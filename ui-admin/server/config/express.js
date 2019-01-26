/*
 * Express configuration
 */

'use strict';

var express = require('express');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var compression = require('compression');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var errorHandler = require('errorhandler');
var path = require('path');
var config = require('./environment/index');

module.exports = function(app) {
    var env = app.get('env');

    app.set('views', config.root + '/server/views');
    app.engine('html', require('ejs').renderFile);
    app.set('view engine', 'html');

    app.use(compression());
    app.use(bodyParser.urlencoded({extended:false}));
    app.use(bodyParser.json());
    app.use(methodOverride());

    if ('build' === env) {
        app.use(express.static(path.join(config.root, 'build'), {
            index: false
        }));

        app.set('appPath', path.join(config.root, 'build'));
        app.use(morgan('dev'));
    }

    if ('dev' === env || 'test' === env) {
        app.use(express.static(path.join(config.root, 'client'), {
            index: false
        }));

        app.use(express.static(config.root));
        app.set('appPath', path.join(config.root, 'client'));
        app.use(morgan('dev'));
        app.use(errorHandler()); // Error handler - has to be last
    }
};