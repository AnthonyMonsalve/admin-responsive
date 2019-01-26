((function() {
    'use strict';

    /*@ngInject*/
    function PromoListCache(CacheFactory) {
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
        .factory('canjeoListCache', PromoListCache);
})());