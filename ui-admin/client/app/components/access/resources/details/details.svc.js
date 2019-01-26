/**
 * Created by daniel on 1/18/17.
 */

((function() {
    'use strict';

    /*@ngInject*/
    function ResourceDetailsSvc(common, ResourcesSvc, ResourceDetailsCluster) {
        var $q = common.$q;
        var resourceDetailsCluster = ResourceDetailsCluster.getCluster();

        function getResource(forceRemote,resourceId) {
            var resource = null;

            if (resourceDetailsCluster.dataLoaded) {
                resource = resourceDetailsCluster.get(resourceId);
            }

            if (!forceRemote && resource) {
                return $q.when(resource);
            }

            return ResourcesSvc.getResource(resourceId).then(function(res){
                if (forceRemote) {
                    resource = resourceDetailsCluster.set({_id:resourceId},res.data);
                } else {
                    resource = resourceDetailsCluster.push(res.data);
                }

                return resource;
            }).catch(function(err){
                throw err;
            });
        }

        var service = {
            getResource: getResource
        };

        return service;
    }

    angular
        .module('hiraApp')
        .factory('ResourceDetailsSvc', ResourceDetailsSvc);
})());
