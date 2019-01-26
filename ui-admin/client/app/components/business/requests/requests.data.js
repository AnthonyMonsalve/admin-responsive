/**
 * Created by daniel on 1/23/17.
 */
/**
 * Created by daniel on 1/18/17.
 */

((function() {
    'use strict';

    /*@ngInject*/
    function RequestsDataHandler(RequestDetailsCluster,
                              RequestsListCache) {
        //Private FUNCTIONS
        var RequestDetailsCluster = RequestDetailsCluster.getCluster();
        var borrowersListCache = RequestsListCache.getCache();

        function createBorrower(){
            borrowersListCache.clear();
        }

        function updateBorrower(borrower,changes) {
            borrowersListCache.update({_id:borrower._id}, changes);
            RequestDetailsCluster.update({_id:borrower._id}, changes);
        }

        function deleteBorrower(borrower) {
            borrowersListCache.remove({_id:borrower._id});
            RequestDetailsCluster.remove({_id:borrower._id});
        }

        var service = {
            createBorrower: createBorrower,
            updateBorrower: updateBorrower,
            deleteBorrower: deleteBorrower
        };

        return service;
    }

    angular
        .module('hiraApp')
        .factory('RequestsDataHandler', RequestsDataHandler);
})());
