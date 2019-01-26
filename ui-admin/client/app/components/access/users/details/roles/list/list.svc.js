/**
 * Created by daniel on 1/18/17.
 */

((function() {
    'use strict';

    /*@ngInject*/
    function UserDetailsRolesListSvc(common, UserRolesSvc, UserDetailsSvc, UserDetailsRolesListCache) {
        var $q = common.$q;

        function getUserRolesList(forceRemote,userId) {
            var userDetailsRolesCache = UserDetailsRolesListCache.getCache(userId);

            if (!userDetailsRolesCache) {
                return UserDetailsSvc.getUser(forceRemote,userId).then(function(){
                    userDetailsRolesCache = UserDetailsRolesListCache.getCache(userId);

                    return getUserRoles(userId,userDetailsRolesCache);
                });
            }

            if (!forceRemote && userDetailsRolesCache.dataLoaded) {
                return $q.when(userDetailsRolesCache)
            }

            return getUserRoles(userId,userDetailsRolesCache);
        }

        function getUserRoles(userId,cache) {
            return UserRolesSvc.getUserRoles(userId).then(function(res){
                cache.set(res.data,userId);

                return cache;
            }).catch(function(err){
                throw err;
            });
        }

        var service = {
            getUserRolesList: getUserRolesList,
            getUserRoles: getUserRoles
        };

        return service;
    }

    angular
        .module('hiraApp')
        .factory('UserDetailsRolesListSvc', UserDetailsRolesListSvc);
})());
