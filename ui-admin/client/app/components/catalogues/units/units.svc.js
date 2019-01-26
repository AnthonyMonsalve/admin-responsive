/**
 * Created by daniel on 1/18/17.
 */

((function() {
    'use strict';

    /*@ngInject*/
    function UnitsSvc(common, UnitsDataHandler, Connections) {
        var $http = common.$http;

        var baseUrl = Connections.getCataloguesServer() + '/catalogues/units';
        //var baseUrl = 'http://172.17.0.3:5005';

        function getUnit(unitId) {
            return $http({
                url: baseUrl + '/show/' + unitId,
                method: 'GET'
            }).then(function(res){
                return res;
            }).catch(function(err){
                throw err;
            });
        }

        function getUnits() {
            return $http({
                url: baseUrl + '/list',
                method: 'GET'
            }).then(function(res){
                return res;
            }).catch(function(err){
                throw err;
            });
        }

        function createUnit(unit) {
            return $http({
                url: baseUrl + '/create',
                method: 'POST',
                data: unit
            }).then(function(res){
                UnitsDataHandler.createUnit();

                return res.data;
            }).catch(function(err){
                console.log(err);
                throw err;
            });
        }

        function updateUnit(unitId,changes) {
            return $http({
                url: baseUrl + '/update/' + unitId,
                method: 'PUT',
                data: changes
            }).then(function (res) {
                UnitsDataHandler.updateUnit(res.data,changes);

                return res.data;
            }).catch(function (err) {
                throw err;
            });
        }

        function deleteUnit(unit) {
            return $http({
                url: baseUrl + '/delete/' + unit._id,
                method: 'DELETE'
            }).then(function (res) {
                UnitsDataHandler.deleteUnit(unit);

                return res.data;
            }).catch(function (err) {
                throw err;
            });
        }

        function removeUnitsBatch(unitIds) {
            return $http({
                url: baseUrl + '/remove_batch',
                method: 'DELETE',
                data: {
                    unitIds: unitIds
                }
            }).then(function (res) {
                return res.data;
            }).catch(function (err) {
                throw err;
            });
        }

        var service = {
            getUnits: getUnits,
            getUnit: getUnit,
            createUnit: createUnit,
            updateUnit: updateUnit,
            deleteUnit: deleteUnit,
            removeUnitsBatch: removeUnitsBatch
        };

        return service;
    }

    angular
        .module('hiraApp')
        .factory('UnitsSvc', UnitsSvc);
})());
