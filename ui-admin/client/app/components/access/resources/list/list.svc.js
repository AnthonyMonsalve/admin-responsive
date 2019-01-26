/**
 * Created by daniel on 1/18/17.
 */

((function() {
    'use strict';

    /*@ngInject*/
    function ResourcesListSvc(common, ResourcesSvc, ResourcesListCache) {
        var $q = common.$q;
        var resourceListCache = ResourcesListCache.getCache();

        function getResources(forceRemote) {
            if (!forceRemote && resourceListCache.dataLoaded) {
                return $q.when(resourceListCache);
            }

            return ResourcesSvc.getResources().then(function(res){
                resourceListCache.set(res.data);

                return resourceListCache;
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
        .factory('ResourcesListSvc', ResourcesListSvc);
})());

