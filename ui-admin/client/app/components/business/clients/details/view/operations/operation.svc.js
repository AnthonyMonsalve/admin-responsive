((function() {
    'use strict';

    /*@ngInject*/
    function ClientsListSvc(common,
        FilterFactory,
        ClientsSvc,
        OperationsListCache) {
        var $q = common.$q;
        var cache = OperationsListCache.getCache();
        var filter = new FilterFactory();

        function getOperations(forceRemote,id) {
            if (!forceRemote && cache.dataLoaded) {
                return $q.when(cache);
            }
            //delete filter.query.type
            console.log(filter.query);
            return ClientsSvc.getClientOperations(id,filter.query).then(function(res) {

                cache.set(res.data);
                filter.setTotalPages(100001);

                return cache;
            }).catch(function(err) {
                throw err;
            });
        }

        function getFilter() {
            return filter;
        }

        var service = {
            getOperations: getOperations,
            getFilter: getFilter
        };

        return service;
    }

    angular
        .module('hiraApp')
        .factory('OperationsListSvc', ClientsListSvc);
})());
