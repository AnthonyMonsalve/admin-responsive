/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

var express = require('express');
var config = require('./config/environment');

// Setup server
var app = express();
var server = require('http').createServer(app);

require('./config/express')(app);

require('./rutas')(app);

app.use(function (err, req, res, next) {
  console.log(err);
  if (err.name === 'UnauthorizedError') {
    res.redirect('/login');
  } else {
    next();
  }
});

// Start server
server.listen(config.port, config.ip, function () {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

// Expose app
var exports = module.exports = app;
