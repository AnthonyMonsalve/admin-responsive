
((function() {
    'use strict';

    /*@ngInject*/
    function fastListSvc(common,
        FilterFactory,
        fastSvc,
        FastListCache) {
        var $q = common.$q;
        var cache =FastListCache.getCache();
        var filter = new FilterFactory();

        function getBankName(client) {
            if (client.bank_accounts) {
                let array = client.bank_accounts;
                for (var i = 0; i < array.length; i++) {
                    var element = array[i];
                    if (element.active) {
                        return element.bank.name;
                    }
                }
            }
        }

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
            getBankName: getBankName
        };

        return service;
    }

    angular
        .module('hiraApp')
        .factory('fastListSvc', fastListSvc);
})());