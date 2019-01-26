/**
 * Created by daniel on 1/18/17.
 */

((function() {
    'use strict';

    /*@ngInject*/
    function StatesListSvc(common, StatesSvc, StatesListCache) {
        var $q = common.$q;
        var stateListCache = StatesListCache.getCache();

        function getStates(forceRemote) {
            if (!forceRemote && stateListCache.dataLoaded) {
                return $q.when(stateListCache);
            }

            return StatesSvc.getStates().then(function(res){
                stateListCache.set(res.data);

                return stateListCache;
            }).catch(function(err){
                throw err;
            });
        }

        var service = {
            getStates: getStates
        };

        return service;
    }

    angular
        .module('hiraApp')
        .factory('StatesListSvc', StatesListSvc);
})());
