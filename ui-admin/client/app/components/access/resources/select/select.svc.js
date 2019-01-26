/**
 * Created by daniel on 1/18/17.
 */

((function() {
    'use strict';

    /*@ngInject*/
    function ResourcesSelectSvc(common, ResourcesSvc, ResourcesSelectCache) {
        var $q = common.$q;
        var resourceSelectCache = ResourcesSelectCache.getCache();

        function getResources(forceRemote) {
            if (!forceRemote && resourceSelectCache.dataLoaded) {
                return $q.when(resourceSelectCache);
            }

            return ResourcesSvc.getResources().then(function(res){
                resourceSelectCache.set(res.data);

                return resourceSelectCache;
            }).catch(function(err){
                throw err;
            });
        }

        var service = {
            getResources: getResources
        };

        return service;
    }

    angular
        .module('hiraApp')
        .factory('ResourcesSelectSvc', ResourcesSelectSvc);
})());

