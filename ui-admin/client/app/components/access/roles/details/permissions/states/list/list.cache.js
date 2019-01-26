/**
 * Created by daniel on 1/18/17.
 */

((function() {
    'use strict';

    /*@ngInject*/
    function RoleDetailsStatePermissionsListCache(CacheFactory, RoleDetailsCluster) {
        var roleDetailsCluster = RoleDetailsCluster.getCluster();
        var states = new CacheFactory('array');

        function getCache(roleId) {
            var role = roleDetailsCluster.get(roleId);

            if (!role.data) {
                return false;
            }

            if (role.data.states) {
                return role.data.states;
            }

            role.data.states = new CacheFactory('array');
            return role.data.states;
        }

        function getStatesCache() {
            return states;
        }

        //API
        var service = {
            getCache: getCache,
            getStatesCache: getStatesCache
        };

        return service;
    }

    angular
        .module('hiraApp')
        .factory('RoleDetailsStatePermissionsListCache', RoleDetailsStatePermissionsListCache);
})());
