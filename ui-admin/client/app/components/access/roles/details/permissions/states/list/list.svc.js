/**
 * Created by daniel on 1/18/17.
 */

((function() {
    'use strict';

    /*@ngInject*/
    function RoleDetailsStatePermissionsListSvc(common,
                                           RoleDetailsSvc,
                                           StatePermissionsSvc,
                                           RoleDetailsStatePermissionsListCache,
                                           StatesSvc) {
        var $q = common.$q;

        function getRoleStatePermissionsList(forceRemote,roleId) {
            var roleDetailsStatePermissionsCache = RoleDetailsStatePermissionsListCache.getCache(roleId);

            if (!roleDetailsStatePermissionsCache) {
                return RoleDetailsSvc.getRole(forceRemote,roleId).then(function(){
                    roleDetailsStatePermissionsCache = RoleDetailsStatePermissionsListCache.getCache(roleId);

                    return getRoleStatePermissions(roleId,roleDetailsStatePermissionsCache);
                });
            }

            if (!forceRemote && roleDetailsStatePermissionsCache.dataLoaded) {
                return $q.when(roleDetailsStatePermissionsCache)
            }

            return getRoleStatePermissions(roleId,roleDetailsStatePermissionsCache);
        }

        function getRoleStatePermissions(roleId,cache){
            return StatePermissionsSvc.getStatePermissions(roleId).then(function(res){
                cache.set(res.data,roleId);

                return cache;
            }).catch(function(err){
                throw err;
            });
        }

        function getStates(forceRemote,roleId) {
            var roleDetailsStatePermissionsStatesCache = RoleDetailsStatePermissionsListCache.getStatesCache(roleId);

            if (!forceRemote && roleDetailsStatePermissionsStatesCache.dataLoaded) {
                return $q.when(roleDetailsStatePermissionsStatesCache);
            }

            return StatesSvc.getStates().then(function(res){
                roleDetailsStatePermissionsStatesCache.set(res.data);

                return roleDetailsStatePermissionsStatesCache;
            }).catch(function(err){
                throw err;
            });
        }

        var service = {
            getRoleStatePermissionsList: getRoleStatePermissionsList,
            getStates: getStates
        };

        return service;
    }

    angular
        .module('hiraApp')
        .factory('RoleDetailsStatePermissionsListSvc', RoleDetailsStatePermissionsListSvc);
})());
