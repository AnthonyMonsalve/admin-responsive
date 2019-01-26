/**
 * Created by daniel on 1/18/17.
 */

((function() {
    'use strict';

    /*@ngInject*/
    function StatesSvc(common, StatesDataHandler, Connections) {
        var $http = common.$http;

        var baseUrl = Connections.getAccessServer() + '/access/states';
        //var baseUrl = 'http://172.17.0.3:5005';

        function getState(stateId) {
            return $http({
                url: baseUrl + '/show/' + stateId,
                method: 'GET'
            }).then(function(res){
                return res;
            }).catch(function(err){
                throw err;
            });
        }

        function getStates() {
            return $http({
                url: baseUrl + '/list',
                method: 'GET'
            }).then(function(res){
                return res;
            }).catch(function(err){
                throw err;
            });
        }

        function createState(state) {
            return $http({
                url: baseUrl + '/create',
                method: 'POST',
                data: state
            }).then(function(res){
                StatesDataHandler.createState(res.data);

                return res.data;
            }).catch(function(err){
                throw err;
            });
        }

        function updateState(stateId,changes,past) {
            return $http({
                url: baseUrl + '/update/' + stateId,
                method: 'PUT',
                data: changes
            }).then(function (res) {
                StatesDataHandler.updateState(res.data,changes,past);

                return res.data;
            }).catch(function (err) {
                throw err;
            });
        }

        function deleteState(stateId) {
            return $http({
                url: baseUrl + '/delete/' + stateId,
                method: 'DELETE'
            }).then(function (res) {
                StatesDataHandler.deleteState(stateId);

                return res.data;
            }).catch(function (err) {
                throw err;
            });
        }

        function removeStatesBatch(stateIds) {
            return $http({
                url: baseUrl + '/remove_batch',
                method: 'DELETE',
                data: {
                    stateIds: stateIds
                }
            }).then(function (res) {
                return res.data;
            }).catch(function (err) {
                throw err;
            });
        }

        var service = {
            getStates: getStates,
            getState: getState,
            createState: createState,
            updateState: updateState,
            deleteState: deleteState,
            removeStatesBatch: removeStatesBatch
        };

        return service;
    }

    angular
        .module('hiraApp')
        .factory('StatesSvc', StatesSvc);
})());
