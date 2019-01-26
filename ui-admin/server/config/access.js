/**
 * Created by daniel on 1/21/17.
 */

'use strict';

const expressJwt = require('express-jwt'),
      validateJwt = expressJwt({ secret: 'secret' }),
      compose = require('composable-middleware');

function isAuthenticated() {
    return function(req, res, next) {
        if (req.url === '/login' || req.url === '/signup') {
            return next();
        }
        // allow access_token to be passed through query parameter as well
        if(req.query && req.query.hasOwnProperty('access_token')) {
            req.headers.authorization = `${req.query.access_token}`;
        }

        validateJwt(req,res,next);
    };
}

function hasAccess() {
    return compose()
        .use(isAuthenticated())
        .use(async function(req, res, next) {
            if (req.url === '/login' || req.url === '/signup') {
                return next();
            }

            const   resource = req.validationRequirements.resource,
                    action = req.validationRequirements.action,
                    permissions = req.user.permissions;

            if (permissions[resource] && permissions[resource][action]) {
                next();
            } else {
                res.status(403).json({code:'unauthorized',msg:'Access not allowed'});
            }
        });
}

module.exports = {
    isAuthenticated, hasAccess
};


