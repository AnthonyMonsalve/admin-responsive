/**
 * Created by daniel on 1/23/17.
 */

((function() {
    'use strict';

    /*@ngInject*/
    function UnitsDataHandler(UnitDetailsCluster,
                              UnitsListCache,
                              UnitsSelectCache) {

        function createUnit(){
            var unitsListCache = UnitsListCache.getCache();
            var unitsSelectCache = UnitsSelectCache.getCache();

            unitsListCache.clear();
            unitsSelectCache.clear();
        }

        function updateUnit(unit,changes) {
            var unitDetailsCluster = UnitDetailsCluster.getCluster();
            var unitsListCache = UnitsListCache.getCache();
            var unitsSelectCache = UnitsSelectCache.getCache();

            unitsListCache.update({_id:unit._id}, changes);
            unitsSelectCache.update({_id:unit._id}, changes);
            unitDetailsCluster.update({_id:unit._id}, changes);
        }

        function deleteUnit(unit) {
            var unitDetailsCluster = UnitDetailsCluster.getCluster();
            var unitsListCache = UnitsListCache.getCache();
            var unitsSelectCache = UnitsSelectCache.getCache();

            unitsListCache.remove({_id:unit._id});
            unitsSelectCache.remove({_id:unit._id});
            unitDetailsCluster.remove({_id:unit._id});
        }

        var service = {
            createUnit: createUnit,
            updateUnit: updateUnit,
            deleteUnit: deleteUnit
        };

        return service;
    }

    angular
        .module('hiraApp')
        .factory('UnitsDataHandler', UnitsDataHandler);
})());
