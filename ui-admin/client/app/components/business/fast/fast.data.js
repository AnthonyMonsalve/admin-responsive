
((function() {
    'use strict';

    /*@ngInject*/
    function fastDataHandler(ClientsDetailsCluster,
                              ClientsListCache) {
        //Private FUNCTIONS
        var clientsDetailsCluster = ClientsDetailsCluster.getCluster();
        var borrowersListCache = ClientsListCache.getCache();

        function createBorrower(){
            borrowersListCache.clear();
        }

        function updateBorrower(borrower,changes) {
            borrowersListCache.update({_id:borrower._id}, changes);
            clientsDetailsCluster.update({_id:borrower._id}, changes);
        }

        function deleteBorrower(borrower) {
            borrowersListCache.remove({_id:borrower._id});
            clientsDetailsCluster.remove({_id:borrower._id});
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
        .factory('fastDataHandler', fastDataHandler);
})());