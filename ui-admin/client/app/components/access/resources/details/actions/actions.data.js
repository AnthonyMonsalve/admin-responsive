/**
 * Created by daniel on 1/23/17.
 */

((function() {
    'use strict';

    /*@ngInject*/
    function ResourceActionsDataHandler(ResourceDetailsCluster) {

        function createResourceAction(){

        }

        function updateResourceAction(resourceAction,changes) {

        }

        function deleteResourceAction(resourceAction) {
            var resourceDetailsCluster = ResourceDetailsCluster.getCluster();
            var resource = resourceDetailsCluster.container[resourceAction.resource];

            if (resource.data && resource.data.roles && resource.data.roles.dataLoaded) {
                resource.data.roles.remove({'_id':resourceAction._id});
            }
        }

        var service = {
            createResourceAction: createResourceAction,
            updateResourceAction: updateResourceAction,
            deleteResourceAction: deleteResourceAction
        };

        return service;
    }

    angular
        .module('hiraApp')
        .factory('ResourceActionsDataHandler', ResourceActionsDataHandler);
})());
