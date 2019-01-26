/**
 * Created by daniel on 1/18/17.
 */

((function() {
    'use strict';

    /*@ngInject*/
    function StatePermissionsSvc(common, Connections) {
        var $http = common.$http;
        var baseUrl = Connections.getAccessServer() + '/access/state_permissions';
        //var baseUrl = 'http://172.17.0.3:5005';

         function togglePermission(roleId,stateId,isActive){
            var action = 'activate';
            if (isActive) {
                action = 'de' + action;
            }

            return $http({
                url: baseUrl + '/' + action,
                method: 'POST',
                data: {
                    role: roleId,
                    state: stateId
                }
            }).then(function(res){
                return res;
            }).catch(function(err){
                throw err;
            });
        }

        function getStatePermissions(roleId) {
            return $http({
                url: baseUrl + '/list/' + roleId,
                method: 'GET'
            }).then(function(res){
                return res;
            }).catch(function(err){
                throw err;
            });
        }

        var service = {
            togglePermission: togglePermission,
            getStatePermissions: getStatePermissions
        };

        return service;
    }

    angular
        .module('hiraApp')
        .factory('StatePermissionsSvc', StatePermissionsSvc);
})());
