/**
 * Created by daniel on 1/23/17.
 */
/**
 * Created by daniel on 1/18/17.
 */

((function() {
    'use strict';

    /*@ngInject*/
    function StatesDataHandler(StatesListCache,
                               StateDetailsCluster) {
        function createState(){
            var statesListCache = StatesListCache.getCache();
            statesListCache.clear();
        }

        function updateState(state,changes) {
            var statesListCache = StatesListCache.getCache();
            var stateDetailsCluster = StateDetailsCluster.getCluster();

            statesListCache.update({_id:state._id},changes);
            stateDetailsCluster.update({_id:state._id},changes);
        }

        function deleteState(stateId) {
            var statesListCache = StatesListCache.getCache();
            var stateDetailsCluster = StateDetailsCluster.getCluster();

            statesListCache.remove({_id:stateId});
            stateDetailsCluster.remove({_id:stateId});
        }

        var service = {
            createState: createState,
            updateState: updateState,
            deleteState: deleteState
        };

        return service;
    }

    angular
        .module('hiraApp')
        .factory('StatesDataHandler', StatesDataHandler);
})());
