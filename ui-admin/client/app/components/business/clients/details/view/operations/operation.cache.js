
((function() {
    'use strict';

    /*@ngInject*/
    function ClientsListCache(CacheFactory) {
        var cache = new CacheFactory('array');

        function getCache() {
            return cache;
        }

        //API
        var service = {
            getCache: getCache
        };

        return service;
    }

    angular
        .module('hiraApp')
        .factory('OperationsListCache', ClientsListCache);
})());
