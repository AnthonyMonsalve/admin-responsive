/**
 * Created by daniel on 1/18/17.
 */

((function() {
    'use strict';

    /*@ngInject*/
    function ActionsSvc(common, ActionsDataHandler, Connections) {
        var $http = common.$http;

        var baseUrl = Connections.getAccessServer() + '/access/actions';
        //var baseUrl = 'http://172.17.0.3:5005';

        function getAction(resourceId,actionId) {
            return $http({
                url: baseUrl + '/show/' + resourceId + '/' + actionId,
                method: 'GET'
            }).then(function(res){
                return res;
            }).catch(function(err){
                throw err;
            });
        }

        function getActions() {
            return $http({
                url: baseUrl + '/list',
                method: 'GET'
            }).then(function(res){
                return res;
            }).catch(function(err){
                throw err;
            });
        }

        function getActionsFromResource(resourceId) {
            return $http({
                url: baseUrl + '/get_actions_from_resource/' + resourceId,
                method: 'GET'
            }).then(function(res){
                return res;
            }).catch(function(err){
                throw err;
            });
        }

        function createAction(action) {
            return $http({
                url: baseUrl + '/create',
                method: 'POST',
                data: action
            }).then(function(res){
                ActionsDataHandler.createAction(res.data);

                return res.data;
            }).catch(function(err){
                throw err;
            });
        }

        function updateAction(resourceId,actionId,changes,past) {
            return $http({
                url: baseUrl + '/update/' + resourceId + '/' + actionId,
                method: 'PUT',
                data: changes
            }).then(function (res) {
                ActionsDataHandler.updateAction(res.data,changes,past);

                return res.data;
            }).catch(function (err) {
                throw err;
            });
        }

        function deleteAction(resourceId,actionId) {
            return $http({
                url: baseUrl + '/delete/' + resourceId + '/' + actionId,
                method: 'DELETE'
            }).then(function (res) {
                ActionsDataHandler.deleteAction(actionId);

                return res.data;
            }).catch(function (err) {
                throw err;
            });
        }

        function removeActionsBatch(actionIds) {
            return $http({
                url: baseUrl + '/remove_batch',
                method: 'DELETE',
                data: {
                    actionIds: actionIds
                }
            }).then(function (res) {
                return res.data;
            }).catch(function (err) {
                throw err;
            });
        }

        var service = {
            getActions: getActions,
            getActionsFromResource: getActionsFromResource,
            getAction: getAction,
            createAction: createAction,
            updateAction: updateAction,
            deleteAction: deleteAction,
            removeActionsBatch: removeActionsBatch
        };

        return service;
    }

    angular
        .module('hiraApp')
        .factory('ActionsSvc', ActionsSvc);
})());
