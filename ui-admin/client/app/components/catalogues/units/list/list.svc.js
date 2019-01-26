/**
 * Created by daniel on 1/18/17.
 */

((function() {
    'use strict';

    /*@ngInject*/
    function UnitsListSvc(common, UnitsSvc, UnitsListCache) {
        var $q = common.$q;
        var unitsListCache = UnitsListCache.getCache();

        function getUnits(forceRemote) {
            if (!forceRemote && unitsListCache.dataLoaded) {
                return $q.when(unitsListCache);
            }

            return UnitsSvc.getUnits().then(function(res){
                unitsListCache.set(res.data);

                return unitsListCache;
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
        .factory('UnitsListSvc', UnitsListSvc);
})());
