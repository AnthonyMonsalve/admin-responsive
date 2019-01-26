((function() {
    'use strict';

    /*@ngInject*/
    function HistoReListCache(CacheFactory) {
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
        .factory('DeudasListCache', HistoReListCache);
})());