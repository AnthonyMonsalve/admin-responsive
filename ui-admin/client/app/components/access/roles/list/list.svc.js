/**
 * Created by daniel on 1/18/17.
 */

((function() {
    'use strict';

    /*@ngInject*/
    function RolesListSvc(common, RolesSvc, RolesListCache) {
        var $q = common.$q;
        var rolesListCache = RolesListCache.getCache();

        function getRoles(forceRemote) {
            if (!forceRemote && rolesListCache.dataLoaded) {
                return $q.when(rolesListCache);
            }

            return RolesSvc.getRoles().then(function(res){
                rolesListCache.set(res.data);

                return rolesListCache;
            }).catch(function(err){
                throw err;
            });
        }

        var service = {
            getRoles: getRoles
        };

        return service;
    }

    angular
        .module('hiraApp')
        .factory('RolesListSvc', RolesListSvc);
})());
