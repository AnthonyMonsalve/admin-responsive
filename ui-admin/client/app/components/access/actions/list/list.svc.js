/**
 * Created by daniel on 1/18/17.
 */

((function() {
    'use strict';

    /*@ngInject*/
    function ActionsListSvc(common, ActionsSvc, ActionsListCache) {
        var $q = common.$q;
        var actionListCache = ActionsListCache.getCache();

        function getActions(forceRemote) {
            if (!forceRemote && actionListCache.dataLoaded) {
                return $q.when(actionListCache);
            }

            return ActionsSvc.getActions().then(function(res){
                actionListCache.set(res.data);

                return actionListCache;
            }).catch(function(err){
                throw err;
            });
        }

        var service = {
            getActions: getActions
        };

        return service;
    }

    angular
        .module('hiraApp')
        .factory('ActionsListSvc', ActionsListSvc);
})());
