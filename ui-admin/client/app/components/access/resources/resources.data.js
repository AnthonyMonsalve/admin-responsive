/**
 * Created by daniel on 1/23/17.
 */
/**
 * Created by daniel on 1/18/17.
 */

((function() {
    'use strict';

    /*@ngInject*/
    function ResourcesDataHandler(ResourceDetailsCluster,
                                  ResourceDetailsActionsListCache,
                                  ResourcesListCache,
                                  ResourcesSelectCache,
                                  ActionDetailsCluster,
                                  ActionsListCache) {
        //Private FUNCTIONS
        var actionDetailsCluster = ActionDetailsCluster.getCluster();
        var actionsListCache = ActionsListCache.getCache();

        var resourceDetailsCluster = ResourceDetailsCluster.getCluster();
        var resourcesListCache = ResourcesListCache.getCache();
        var resourcesSelectCache = ResourcesSelectCache.getCache();
        var resourceDetailsActionsListCache = ResourceDetailsActionsListCache.getCache();

        function createResource(){
            resourcesListCache.clear();
            resourcesSelectCache.clear();
        }

        function updateResource(resource,changes) {
            resourcesListCache.update({_id:resource._id}, changes);
            resourcesSelectCache.update({_id:resource._id}, changes);
            resourceDetailsCluster.update({_id:resource._id}, changes);
        }

        function deleteResource(resource) {
            actionsListCache.removeBatch({resourceId:resource._id});
            actionDetailsCluster.removeBatch({resourceId:resource._id});

            resourcesListCache.remove({_id:resource._id});
            resourcesSelectCache.remove({_id:resource._id});
            resourceDetailsCluster.remove({_id:resource._id});

            resourceDetailsActionsListCache.removeBatch({resourceId:resource._id});
        }

        function deleteResourcesBatch() {
            actionsListCache.clear();
            /*actionsListCache.removeBatch({resourceId:resource._id});
            actionDetailsCluster.removeBatch({resourceId:resource._id});

            resourcesListCache.remove({_id:resource._id});
            resourcesSelectCache.remove({_id:resource._id});
            resourceDetailsCluster.remove({_id:resource._id});

            resourceDetailsActionsListCache.removeBatch({resourceId:resource._id});*/
        }

        var service = {
            createResource: createResource,
            updateResource: updateResource,
            deleteResource: deleteResource,
            deleteResourcesBatch: deleteResourcesBatch
        };

        return service;
    }

    angular
        .module('hiraApp')
        .factory('ResourcesDataHandler', ResourcesDataHandler);
})());
