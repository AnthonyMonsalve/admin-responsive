/**
 * Created by daniel on 1/18/17.
 */

((function() {
    'use strict';

    /*@ngInject*/
    function ActionDetailsSvc(common, ActionsSvc, ActionDetailsCluster) {
        var $q = common.$q;
        var actionDetailsCluster = ActionDetailsCluster.getCluster();

        function getAction(forceRemote,resourceId,actionId) {
            var action = null;

            if (actionDetailsCluster.dataLoaded) {
                action = actionDetailsCluster.get(actionId);
            }

            if (!forceRemote && action) {
                return $q.when(action);
            }

            return ActionsSvc.getAction(resourceId,actionId).then(function(res){
                if (forceRemote) {
                    action = actionDetailsCluster.set({_id:actionId},res.data);
                } else {
                    action = actionDetailsCluster.push(res.data);
                }

                return action;
            }).catch(function(err){
                throw err;
            });
        }

        var service = {
            getAction: getAction
        };

        return service;
    }

    angular
        .module('hiraApp')
        .factory('ActionDetailsSvc', ActionDetailsSvc);
})());
