/**
 * Created by daniel on 1/18/17.
 */

((function() {
    'use strict';

    /*@ngInject*/
    function ResourceDetailsActionsListCache(CacheFactory, ResourceDetailsCluster) {
        var resourceDetailsCluster = ResourceDetailsCluster.getCluster();

        function getCache(resourceId) {
            var resource = resourceDetailsCluster.get(resourceId);

            if (!resource.data) {
                return false;
            }

            if (resource.data.actions) {
                return resource.data.actions;
            }

            resource.data.actions = new CacheFactory('array');
            return resource.data.actions;
        }

        //API
        var service = {
            getCache: getCache
        };

        return service;
    }

    angular
        .module('hiraApp')
        .factory('ResourceDetailsActionsListCache', ResourceDetailsActionsListCache);
})());
