/**
 * Created by daniel on 1/18/17.
 */

((function() {
    'use strict';

    /*@ngInject*/
    function RolesSvc(common, RolesDataHandler, Connections) {
        var $http = common.$http;

        var baseUrl = Connections.getAccessServer() + '/access/roles';
        //var baseUrl = 'http://172.17.0.3:5005';

        function getRole(roleId) {
            return $http({
                url: baseUrl + '/show/' + roleId,
                method: 'GET'
            }).then(function(res){
                return res;
            }).catch(function(err){
                throw err;
            });
        }

        function getRoles() {
            return $http({
                url: baseUrl + '/list',
                method: 'GET'
            }).then(function(res){
                return res;
            }).catch(function(err){
                throw err;
            });
        }

        function createRole(role) {
            return $http({
                url: baseUrl + '/create',
                method: 'POST',
                data: role
            }).then(function(res){
                RolesDataHandler.createRole();

                return res.data;
            }).catch(function(err){
                console.log(err);
                throw err;
            });
        }

        function updateRole(roleId,changes) {
            return $http({
                url: baseUrl + '/update/' + roleId,
                method: 'PUT',
                data: changes
            }).then(function (res) {
                RolesDataHandler.updateRole(res.data,changes);

                return res.data;
            }).catch(function (err) {
                throw err;
            });
        }

        function deleteRole(role) {
            return $http({
                url: baseUrl + '/delete/' + role._id,
                method: 'DELETE'
            }).then(function (res) {
                RolesDataHandler.deleteRole(role);

                return res.data;
            }).catch(function (err) {
                throw err;
            });
        }

        function removeRolesBatch(roleIds) {
            return $http({
                url: baseUrl + '/remove_batch',
                method: 'DELETE',
                data: {
                    roleIds: roleIds
                }
            }).then(function (res) {
                return res.data;
            }).catch(function (err) {
                throw err;
            });
        }

        var service = {
            getRoles: getRoles,
            getRole: getRole,
            createRole: createRole,
            updateRole: updateRole,
            deleteRole: deleteRole,
            removeRolesBatch: removeRolesBatch
        };

        return service;
    }

    angular
        .module('hiraApp')
        .factory('RolesSvc', RolesSvc);
})());
