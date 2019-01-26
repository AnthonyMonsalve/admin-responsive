/**
 * Created by daniel on 1/18/17.
 */

((function() {
    'use strict';

    /*@ngInject*/
    function RolesSelectSvc(common, RolesSvc, RolesSelectCache) {
        var $q = common.$q;
        var roleSelectCache = RolesSelectCache.getCache();

        function getRoles(forceRemote) {
            if (!forceRemote && roleSelectCache.dataLoaded) {
                return $q.when(roleSelectCache);
            }

            return RolesSvc.getRoles().then(function(res){
                roleSelectCache.set(res.data);

                return roleSelectCache;
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
        .factory('RolesSelectSvc', RolesSelectSvc);
})());

