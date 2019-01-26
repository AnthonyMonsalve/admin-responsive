/**
 * Created by daniel on 1/18/17.
 */

((function() {
    'use strict';

    /*@ngInject*/
    function RequestsListSvc(common,
        FilterFactory,
        RequestsSvc,
        RequestsListCache) {
        var $q = common.$q;
        var cache = RequestsListCache.getCache();
        var filter = new FilterFactory();

        function getRequestBankName(request) {
            if (request.type === "BankAccountActivation") {
                return request.bank.name;
            } else if (request.type === "ContactUs") {
                return "";
            } else if (request.type === "RechargeRequest") {
                return request.bank.name;
            } else if (request.type === "WithdrawalRequest") {
                /* Colocamos esto aqui por data vieja que puede dar problemas */
                try {
                    return request.receiver_info.bank.name;
                } catch (error) {
                    console.log(error);
                }
            }
        }

        function getRequests(forceRemote) {
            if (!forceRemote && cache.dataLoaded) {
                return $q.when(cache);
            }
            console.log(filter.query);
            return RequestsSvc.getRequests(filter.query).then(function(res) {
                for (var i = 0; i < res.data.list.length; i++) {
                    //res.data.list[i].bankName = getRequestBankName(res.data.list[i]);
                    console.log(res.data.list[i]);
                }
                cache.set(res.data);
                filter.setTotalPages(res.data.count);

                return cache;
            }).catch(function(err) {
                throw err;
            });
        }

        function getFilter() {
            return filter;
        }

        var service = {
            getRequests: getRequests,
            getFilter: getFilter
        };

        return service;
    }

    angular
        .module('hiraApp')
        .factory('RequestsListSvc', RequestsListSvc);
})());