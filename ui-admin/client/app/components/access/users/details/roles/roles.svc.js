/**
 * Created by daniel on 1/18/17.
 */

((function() {
    'use strict';

    /*@ngInject*/
    function UserRolesSvc(common, UserRolesDataHandler, Connections) {
        var $http = common.$http;

        //var baseUrl = 'http://172.17.0.3:5005/access/identityRoles';
        var baseUrl = Connections.getAccessServer() + '/access/identities_roles';

        function getUserRoles(userId) {
              return $http({
                url: baseUrl + '/list',
                method: 'GET',
                params: {
                    userId: userId
                }
            }).then(function(res){
                return res;
            }).catch(function(err){
                throw err;
            });
        }


        function createUserRole(userRole) {
            return $http({
                url: baseUrl + '/create',
                method: 'POST',
                data: userRole
            }).then(function(res){
                return res;
            }).catch(function(err){
                throw err;
            });
        }

        function deleteUserRole(userId,userRole) {
            return $http({
                url: baseUrl + '/delete/' + userRole._id,
                method: 'DELETE'
            }).then(function(res){
                UserRolesDataHandler.deleteUserRole(userId,userRole);
                return res;
            }).catch(function(err){
                throw err;
            });
        }

        var service = {
            getUserRoles: getUserRoles,
            createUserRole: createUserRole,
            deleteUserRole: deleteUserRole
        };

        return service;
    }

    angular
        .module('hiraApp')
        .factory('UserRolesSvc', UserRolesSvc);
})());
