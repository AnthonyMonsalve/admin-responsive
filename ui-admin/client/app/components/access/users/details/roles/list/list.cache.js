/**
 * Created by daniel on 1/18/17.
 */

((function() {
    'use strict';

    /*@ngInject*/
    function UserDetailsRolesListCache(CacheFactory, UserDetailsCluster) {
        var userDetailsCluster = UserDetailsCluster.getCluster();

        function getCache(userId) {
            var user = userDetailsCluster.get(userId);

            if (!user.data) {
                return false;
            }

            if (user.data.roles) {
                return user.data.roles;
            }

            user.data.roles = new CacheFactory('array');
            return user.data.roles;
        }

        //API
        var service = {
            getCache: getCache
        };

        return service;
    }

    angular
        .module('hiraApp')
        .factory('UserDetailsRolesListCache', UserDetailsRolesListCache);
})());
