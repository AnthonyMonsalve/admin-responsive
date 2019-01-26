/**
 * Created by daniel on 1/18/17.
 */

((function() {
    'use strict';

    /*@ngInject*/
    function ResourceDetailsActionsListSvc(common, ResourcesSvc, ResourceDetailsSvc, ResourceDetailsActionsListCache) {
        var $q = common.$q;

        function getResourceActionsList(forceRemote,resourceId) {
            var resourceDetailsActionsCache = ResourceDetailsActionsListCache.getCache(resourceId);

            if (!resourceDetailsActionsCache) {
                return ResourceDetailsSvc.getResource(forceRemote,resourceId).then(function(){
                    resourceDetailsActionsCache = ResourceDetailsActionsListCache.getCache(resourceId);

                    return getResourceActions(resourceId,resourceDetailsActionsCache);
                });
            }

            if (!forceRemote && resourceDetailsActionsCache.dataLoaded) {
                return $q.when(resourceDetailsActionsCache)
            }

            return getResourceActions(resourceId,resourceDetailsActionsCache);
        }

        function getResourceActions(resourceId,cache) {
            return ResourcesSvc.getResourceActions(resourceId).then(function(res){
                cache.set(res.data,resourceId);

                return cache;
            }).catch(function(err){
                throw err;
            });
        }

        var service = {
            getResourceActionsList: getResourceActionsList
        };

        return service;
    }

    angular
        .module('hiraApp')
        .factory('ResourceDetailsActionsListSvc', ResourceDetailsActionsListSvc);
})());
