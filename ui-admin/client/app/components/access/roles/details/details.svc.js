/**
 * Created by daniel on 1/18/17.
 */

((function() {
    'use strict';

    /*@ngInject*/
    function RoleDetailsSvc(common, RolesSvc, RoleDetailsCluster) {
        var $q = common.$q;
        var roleDetailsCluster = RoleDetailsCluster.getCluster();

        function getRole(forceRemote,roleId) {
            var role = null;

            if (roleDetailsCluster.dataLoaded) {
                role = roleDetailsCluster.get(roleId);
            }

            if (!forceRemote && role) {
                return $q.when(role);
            }

            return RolesSvc.getRole(roleId).then(function(res){
                if (forceRemote) {
                    role = roleDetailsCluster.set({_id:roleId},res.data);
                } else {
                    role = roleDetailsCluster.push(res.data);
                }

                return role;
            }).catch(function(err){
                throw err;
            });
        }

        var service = {
            getRole: getRole
        };

        return service;
    }

    angular
        .module('hiraApp')
        .factory('RoleDetailsSvc', RoleDetailsSvc);
})());
