/**
 * Created by daniel on 1/18/17.
 */

((function() {
    'use strict';

    /*@ngInject*/
    function UnitDetailsSvc(common, UnitsSvc, UnitDetailsCluster) {
        var $q = common.$q;
        var unitDetailsCluster = UnitDetailsCluster.getCluster();

        function getUnit(forceRemote,unitId) {
            var unit = null;

            if (unitDetailsCluster.dataLoaded) {
                unit = unitDetailsCluster.get(unitId);
            }

            if (!forceRemote && unit) {
                return $q.when(unit);
            }

            return UnitsSvc.getUnit(unitId).then(function(res){
                if (forceRemote) {
                    unit = unitDetailsCluster.set({_id:unitId},res.data);
                } else {
                    unit = unitDetailsCluster.push(res.data);
                }

                return unit;
            }).catch(function(err){
                throw err;
            });
        }

        var service = {
            getUnit: getUnit
        };

        return service;
    }

    angular
        .module('hiraApp')
        .factory('UnitDetailsSvc', UnitDetailsSvc);
})());
