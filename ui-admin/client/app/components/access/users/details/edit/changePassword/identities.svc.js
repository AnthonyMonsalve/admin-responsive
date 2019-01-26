/**
 * Created by daniel on 1/18/17.
 */

((function() {
    'use strict';

    /*@ngInject*/
    function IdentitiesSvc(common, Connections) {
        var $http = common.$http;

        var baseUrl = Connections.getAccessServer() + '/access/identities';
        //var baseUrl = 'http://172.17.0.3:5005/access/identities';

        function updateIdentity(userId,changes) {
            return $http({
                url: baseUrl + '/update_by_user/' + userId,
                method: 'PUT',
                data: changes
            }).then(function (res) {
                return res.data;
            }).catch(function (err) {
                throw err;
            });
        }

        var service = {
            updateIdentity: updateIdentity
        };

        return service;
    }

    angular
        .module('hiraApp')
        .factory('IdentitiesSvc', IdentitiesSvc);
})());
