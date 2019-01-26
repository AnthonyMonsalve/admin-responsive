
((function() {
    'use strict';

    /*@ngInject*/
    function diarioListSvc(common,
        FilterFactory,
        prodataSvc,
        recargaListCache) {
        var $q = common.$q;
        var cache =recargaListCache.getCache();
        var filter = new FilterFactory();

        function getClients() {
            if (!forceRemote && cache.dataLoaded) {
                return $q.when(cache);
            }
            console.log(filter.query);
            return fastSvc.getClients(filter.query).then(function(res) {

                for (var i = 0; i < res.data.list.length; i++) {
                    res.data.list[i].bankName = getBankName(res.data.list[i]);
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
            getClients: getClients,
            getFilter: getFilter,
        };

        return service;
    }

    angular
        .module('hiraApp')
        .factory('recargaListSvc', diarioListSvc);
})());
