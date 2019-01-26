/**
 * Created by daniel on 1/18/17.
 */

((function() {
    'use strict';

    /*@ngInject*/
    function UnitsSelectSvc(common, UnitsSvc, UnitsSelectCache) {
        var $q = common.$q;
        var unitSelectCache = UnitsSelectCache.getCache();

        function getUnits(forceRemote) {
            if (!forceRemote && unitSelectCache.dataLoaded) {
                return $q.when(unitSelectCache);
            }

            return UnitsSvc.getUnits().then(function(res){
                unitSelectCache.set(res.data);

                return unitSelectCache;
            }).catch(function(err){
                throw err;
            });
        }

        var service = {
            getUnits: getUnits
        };

        return service;
    }

    angular
        .module('hiraApp')
        .factory('UnitsSelectSvc', UnitsSelectSvc);
})());

