/**
 * Created by daniel on 1/18/17.
 */

((function() {
    'use strict';

    /*@ngInject*/
    function ResourcesListCache(CacheFactory) {
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
        .factory('ResourcesListCache', ResourcesListCache);
})());
