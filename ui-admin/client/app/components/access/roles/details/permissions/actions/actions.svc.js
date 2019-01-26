/**
 * Created by daniel on 1/18/17.
 */

((function() {
    'use strict';

    /*@ngInject*/
    function ActionPermissionsSvc(common, Connections) {
        var $http = common.$http;
        var baseUrl = Connections.getAccessServer() + '/access/action_permissions';
        //var baseUrl = 'http://172.17.0.3:5005';

         function togglePermission(roleId,resourceId,actionId,isActive){
            var action = 'activate';
            if (isActive) {
                action = 'de' + action;
            }

            return $http({
                url: baseUrl + '/' + action,
                method: 'POST',
                data: {
                    role: roleId,
                    resource: resourceId,
                    action: actionId
                }
            }).then(function(res){
                return res;
            }).catch(function(err){
                throw err;
            });
        }

        function getActionPermissions(roleId) {
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
            getActionPermissions: getActionPermissions
        };

        return service;
    }

    angular
        .module('hiraApp')
        .factory('ActionPermissionsSvc', ActionPermissionsSvc);
})());
