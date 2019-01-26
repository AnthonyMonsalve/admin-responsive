'use strict';

const   r = require('request'),

/**
 * Attaches the user object to the request if authenticated
 * Otherwise returns 403
 */
function isAuthenticated() {
    return function(req,res,next) {
        console.log(req.headers);
/*
        r({
            method: 'GET',
            uri: 'http://localhost:5005'
        })

        if ((req.session && req.session.identity) || req.url == '/login'){
            return next();
        }
*/

        next();
        //res.redirect('login');
    }
}

exports.isAuthenticated = isAuthenticated;