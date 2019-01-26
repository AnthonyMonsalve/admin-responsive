/**
 * Created by daniel on 1/18/17.
 */

((function() {
    'use strict';

    /*@ngInject*/
    function RoleDetailsActionPermissionsListCache(CacheFactory, RoleDetailsCluster) {
        var roleDetailsCluster = RoleDetailsCluster.getCluster();
        var resources = new CacheFactory('array');

        function getCache(roleId) {
            var role = roleDetailsCluster.get(roleId);

            if (!role.data) {
                return false;
            }

            if (role.data.actions) {
                return role.data.actions;
            }

            role.data.actions= new CacheFactory('array');
            return role.data.actions;
        }

        function getResourcesCache() {
            return resources;
        }

        //API
        var service = {
            getCache: getCache,
            getResourcesCache: getResourcesCache
        };

        return service;
    }

    angular
        .module('hiraApp')
        .factory('RoleDetailsActionPermissionsListCache', RoleDetailsActionPermissionsListCache);
})());
