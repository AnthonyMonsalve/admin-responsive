/**
 * Created by daniel on 1/18/17.
 */

((function() {
    'use strict';

    /*@ngInject*/
    function ResourcesSvc(common, ResourcesDataHandler, Connections) {
        var $http = common.$http;

        var baseUrl = Connections.getAccessServer() + '/access/resources';
        //var baseUrl = 'http://172.17.0.3:5005/access/resources';


        function getResource(resourceId) {
            return $http({
                url: baseUrl + '/show/' + resourceId,
                method: 'GET'
            }).then(function(res){
                return res;
            }).catch(function(err){
                throw err;
            });
        }

        function getResources() {
            return $http({
                url: baseUrl + '/list',
                method: 'GET'
            }).then(function(res){
                return res;
            }).catch(function(err){
                throw err;
            });
        }

        function getResourcesActions() {
            return $http({
                url: baseUrl + '/get_resources_actions',
                method: 'GET'
            }).then(function(res){
                return res;
            }).catch(function(err){
                throw err;
            });
        }

        function getResourceActions(resourceId) {
            return $http({
                url: baseUrl + '/get_resource_actions/' + resourceId,
                method: 'GET'
            }).then(function(res){
                return res;
            }).catch(function(err){
                throw err;
            });
        }


        function createResource(resource) {
            return $http({
                url: baseUrl + '/create',
                method: 'POST',
                data: resource
            }).then(function(res){
                ResourcesDataHandler.createResource();

                return res.data;
            }).catch(function(err){
                throw err;
            });
        }

        function updateResource(resourceId,changes) {
            return $http({
                url: baseUrl + '/update/' + resourceId,
                method: 'PUT',
                data: changes
            }).then(function (res) {
                ResourcesDataHandler.updateResource(res.data,changes);

                return res.data;
            }).catch(function (err) {
                throw err;
            });
        }

        function deleteResource(resource) {
            return $http({
                url: baseUrl + '/delete/' + resource._id,
                method: 'DELETE'
            }).then(function (res) {
                ResourcesDataHandler.deleteResource(resource);

                return res.data;
            }).catch(function (err) {
                throw err;
            });
        }

        function removeResourcesBatch(resourceIds) {
            return $http({
                url: baseUrl + '/remove_batch',
                method: 'DELETE',
                data: {
                    resourceIds: resourceIds
                }
            }).then(function (res) {
                ResourcesDataHandler.deleteResourcesBatch();

                return res.data;
            }).catch(function (err) {
                throw err;
            });
        }

        var service = {
            getResources: getResources,
            getResourceActions: getResourceActions,
            getResourcesActions: getResourcesActions,
            getResource: getResource,
            createResource: createResource,
            updateResource: updateResource,
            deleteResource: deleteResource,
            removeResourcesBatch: removeResourcesBatch
        };

        return service;
    }

    angular
        .module('hiraApp')
        .factory('ResourcesSvc', ResourcesSvc);
})());
