/**
 * Created by daniel on 1/18/17.
 */

((function() {
    'use strict';

    /*@ngInject*/
    function RoleDetailsActionPermissionsListSvc(common,
                                           RoleDetailsSvc,
                                           ActionPermissionsSvc,
                                           RoleDetailsActionPermissionsListCache,
                                           ResourcesSvc) {
        var $q = common.$q;

        function getRoleActionPermissionsList(forceRemote,roleId) {
            var roleDetailsActionPermissionsCache = RoleDetailsActionPermissionsListCache.getCache(roleId);

            if (!roleDetailsActionPermissionsCache) {
                return RoleDetailsSvc.getRole(forceRemote,roleId).then(function(){
                    roleDetailsActionPermissionsCache = RoleDetailsActionPermissionsListCache.getCache(roleId);

                    return getRoleActionPermissions(roleId,roleDetailsActionPermissionsCache);
                });
            }

            if (!forceRemote && roleDetailsActionPermissionsCache.dataLoaded) {
                return $q.when(roleDetailsActionPermissionsCache)
            }

            return getRoleActionPermissions(roleId,roleDetailsActionPermissionsCache);
        }

        function getRoleActionPermissions(roleId,cache){
            return ActionPermissionsSvc.getActionPermissions(roleId).then(function(res){
                cache.set(res.data,roleId);

                return cache;
            }).catch(function(err){
                throw err;
            });
        }

        function getResourcesActions(forceRemote,roleId) {
            var roleDetailsActionPermissionsResourcesCache = RoleDetailsActionPermissionsListCache.getResourcesCache(roleId);

            if (!forceRemote && roleDetailsActionPermissionsResourcesCache.dataLoaded) {
                return $q.when(roleDetailsActionPermissionsResourcesCache);
            }

            return ResourcesSvc.getResourcesActions().then(function(res){
                roleDetailsActionPermissionsResourcesCache.set(res.data);

                return roleDetailsActionPermissionsResourcesCache;
            }).catch(function(err){
                throw err;
            });
        }

        var service = {
            getRoleActionPermissionsList: getRoleActionPermissionsList,
            getResourcesActions: getResourcesActions
        };

        return service;
    }

    angular
        .module('hiraApp')
        .factory('RoleDetailsActionPermissionsListSvc', RoleDetailsActionPermissionsListSvc);
})());
