/**
 * Created by daniel on 1/23/17.
 */
/**
 * Created by daniel on 1/18/17.
 */

((function() {
    'use strict';

    /*@ngInject*/
    function ActionsDataHandler(ResourceDetailsCluster,
                                ActionsListCache,
                                ActionDetailsCluster) {
        function createAction(action){
            var actionsListCache = ActionsListCache.getCache();
            var resourceDetailsCluster = ResourceDetailsCluster.getCluster();

            actionsListCache.clear();

            var resource = resourceDetailsCluster.container[action.resourceId];

            if (resource &&
                resource.data &&
                resource.data.actions &&
                resource.data.actions.dataLoaded) {
                resource.data.actions.clear();
            }

        }

        function updateAction(action,changes,past) {
            var actionsListCache = ActionsListCache.getCache();
            var actionDetailsCluster = ActionDetailsCluster.getCluster();
            var resourceDetailsCluster = ResourceDetailsCluster.getCluster();

            actionsListCache.update({_id:action._id},changes);
            actionDetailsCluster.update({_id:action._id},changes);

            if (changes.resourceId) {
                var pastResource = resourceDetailsCluster.container[past.resourceId];

                if (pastResource &&
                    pastResource.data &&
                    pastResource.data.actions &&
                    pastResource.data.actions.dataLoaded) {
                    pastResource.data.actions.remove({'_id':action._id});
                }

                var newResource = resourceDetailsCluster.container[action.resourceId];

                if (newResource &&
                    newResource.data &&
                    newResource.data.actions &&
                    newResource.data.actions.dataLoaded) {
                    newResource.data.actions.clear();
                }
            } else {
                var resource = resourceDetailsCluster.container[action.resourceId];

                if (resource &&
                    resource.data &&
                    resource.data.actions &&
                    resource.data.actions.dataLoaded) {
                    resource.data.actions.update({'_id':action._id},changes);
                    console.log(resource.data.actions);
                }
            }
        }

        function deleteAction(actionId) {
            var actionsListCache = ActionsListCache.getCache();
            var actionDetailsCluster = ActionDetailsCluster.getCluster();
            var resourceDetailsCluster = ResourceDetailsCluster.getCluster();

            actionsListCache.remove({_id:actionId});
            actionDetailsCluster.remove({_id:actionId});

            var resource;

            for (var id in resourceDetailsCluster.container) {
                resource = resourceDetailsCluster.container[id];
                if (resource.data &&
                    resource.data.actions &&
                    resource.data.actions.dataLoaded) {
                    resource.data.actions.remove({'_id': actionId});
                }
            }
        }

        var service = {
            createAction: createAction,
            updateAction: updateAction,
            deleteAction: deleteAction
        };

        return service;
    }

    angular
        .module('hiraApp')
        .factory('ActionsDataHandler', ActionsDataHandler);
})());
