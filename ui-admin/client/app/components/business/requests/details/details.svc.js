/**
 * Created by daniel on 1/18/17.
 */

((function() {
    'use strict';

    /*@ngInject*/
    function RequestDetailsSvc(common, RequestsSvc, RequestDetailsCluster) {
        var $q = common.$q;
        var borrowerDetailsCluster = RequestDetailsCluster.getCluster();

        function getRequest(forceRemote,borrowerId) {
            var borrower = null;

            if (borrowerDetailsCluster.dataLoaded) {
                borrower = borrowerDetailsCluster.get(borrowerId);
            }

            if (!forceRemote && borrower) {
                return $q.when(borrower);
            }

            return RequestsSvc.getRequest(borrowerId).then(function(res){
                if (forceRemote) {
                    borrower = borrowerDetailsCluster.set(borrowerId,res.data);
                } else {
                    borrower = borrowerDetailsCluster.push(res.data);
                }

                return borrower;
            }).catch(function(err){
                throw err;
            });
        }

        function deleteBorrowerContacts(borrowerId,contactIds){
            borrowerDetailsCluster.removeSubdocs(borrowerId,{contacts:{_id:contactIds}});
        }

        var service = {
            getRequest: getRequest,
            deleteBorrowerContacts: deleteBorrowerContacts
        };

        return service;
    }

    angular
        .module('hiraApp')
        .factory('RequestDetailsSvc', RequestDetailsSvc);
})());
