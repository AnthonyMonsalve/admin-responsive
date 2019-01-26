/**
 * Created by daniel on 1/18/17.
 */

((function() {
    'use strict';

    /*@ngInject*/
    function UsersSvc(common, UsersDataHandler, Connections,localStorageService,$cookies) {
        var $http = common.$http;
        var storage = localStorageService;

        var baseUrl = Connections.getAccessServer() + '/access/users';
        var baseUrlOp = Connections.getBusinessServer() + '/business/operations';
        var baseUrlPer = Connections.getBusinessServer() + '/business/persons';
        //var baseUrl = 'http://172.17.0.3:5005/access/users';


        function getUser(userId) {
            return $http({
                url: baseUrl + '/show/' + userId,
                method: 'GET'
            }).then(function(res) {
                return res;
            }).catch(function(err) {
                throw err;
            });
        }

        function getUsers() {
            return $http({
                url: baseUrl + '/list',
                method: 'GET'
            }).then(function(res) {
                return res;
            }).catch(function(err) {
                console.log(err);
                throw err;
            });
        }

        function createUser(user) {
            return $http({
                url: baseUrl + '/create',
                method: 'POST',
                data: user
            }).then(function(res) {
                UsersDataHandler.createUser();

                return res;
            }).catch(function(err) {
                throw err;
            });
        }

        function updateUser(userId, changes) {
            return $http({
                url: baseUrl + '/update/' + userId,
                method: 'PUT',
                data: changes
            }).then(function(res) {
                UsersDataHandler.updateUser(res.data, changes);

                return res.data;
            }).catch(function(err) {
                throw err;
            });
        }

        function blockUser(data) {
            return $http({
                url: baseUrl + '/block',
                headers:{Authorization: $cookies.get('token'), user: storage.get('username')},
                method: 'POST',
                data: data
            }).then(function(res) {
                return res.data;
            }).catch(function(err) {
                throw err;
            });
        }

        function activateUser(data) {
            return $http({
                url: baseUrl + '/activate',
                method: 'POST',
                data: data
            }).then(function(res) {
                return res.data;
            }).catch(function(err) {
                throw err;
            });
        }

        function deactivateUser(data) {
            return $http({
                url: baseUrl + '/deactivate',
                method: 'POST',
                data: data
            }).then(function(res) {
                return res.data;
            }).catch(function(err) {
                throw err;
            });
        }

        function activateFilter(data) {
            return $http({
                url: baseUrlPer + '/activateFilter',
                headers:{Authorization: $cookies.get('token'), user: storage.get('username')},
                method: 'POST',
                data: data
            }).then(function(res) {
                return res.data;
            }).catch(function(err) {
                throw err;
            });
        }

        function deactivateFilter(data) {
            return $http({
                url: baseUrlPer + '/deactivateFilter',
                headers:{Authorization: $cookies.get('token'), user: storage.get('username')},
                method: 'POST',
                data: data
            }).then(function(res) {
                return res.data;
            }).catch(function(err) {
                throw err;
            });
        }

        function deleteUser(user) {
            return $http({
                url: baseUrl + '/delete/' + user._id,
                method: 'DELETE'
            }).then(function(res) {
                UsersDataHandler.deleteUser(user);

                return res.data;
            }).catch(function(err) {
                throw err;
            });
        }

        function removeUsersBatch(userIds) {
            return $http({
                url: baseUrl + '/remove_batch',
                method: 'DELETE',
                data: {
                    userIds: userIds
                }
            }).then(function(res) {
                return res.data;
            }).catch(function(err) {
                throw err;
            });
        }

        function setAble(info){
            return $http({
                url: baseUrlOp +'recharges/able',
                headers:{Authorization: $cookies.get('token'), user: storage.get('username')},
                method: 'PUT',
                data: info
            })
        }

        function setPromo(info){
            return $http({
                url:baseUrl+'/setPromo',
                headers: {Authorization: $cookies.get('token'), user: storage.get('username')},
                method: 'POST',
                data:info
            })
        }

        var service = {
            setPromo: setPromo,
            blockUser: blockUser,
            getUsers: getUsers,
            getUser: getUser,
            createUser: createUser,
            updateUser: updateUser,
            activateUser: activateUser,
            deactivateUser: deactivateUser,
            activateFilter: activateFilter,
            deactivateFilter: deactivateFilter,
            deleteUser: deleteUser,
            removeUsersBatch: removeUsersBatch,
            setAble: setAble
        };

        return service;
    }

    angular
        .module('hiraApp')
        .factory('UsersSvc', UsersSvc);
})());
