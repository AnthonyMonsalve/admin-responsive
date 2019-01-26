/**
 * Created by daniel on 1/18/17.
 */

((function() {
    'use strict';

    /*@ngInject*/
    function StateDetailsSvc(common, StatesSvc, StateDetailsCluster) {
        var $q = common.$q;
        var stateDetailsCluster = StateDetailsCluster.getCluster();

        function getState(forceRemote,stateId) {
            var state = null;

            if (stateDetailsCluster.dataLoaded) {
                state = stateDetailsCluster.get(stateId);
            }

            if (!forceRemote && state) {
                return $q.when(state);
            }

            return StatesSvc.getState(stateId).then(function(res){
                if (forceRemote) {
                    state = stateDetailsCluster.set({_id:stateId},res.data);
                } else {
                    state = stateDetailsCluster.push(res.data);
                }

                return state;
            }).catch(function(err){
                throw err;
            });
        }

        var service = {
            getState: getState
        };

        return service;
    }

    angular
        .module('hiraApp')
        .factory('StateDetailsSvc', StateDetailsSvc);
})());
