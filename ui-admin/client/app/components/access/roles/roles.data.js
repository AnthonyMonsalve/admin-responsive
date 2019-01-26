/**
 * Created by daniel on 1/23/17.
 */

((function() {
    'use strict';

    /*@ngInject*/
    function RolesDataHandler(RoleDetailsCluster,
                              RolesListCache,
                              RolesSelectCache,
                              UserDetailsCluster) {

        function createRole(){
            var rolesListCache = RolesListCache.getCache();
            var rolesSelectCache = RolesSelectCache.getCache();

            rolesListCache.clear();
            rolesSelectCache.clear();
        }

        function updateRole(role,changes) {
            try {
                var roleDetailsCluster = RoleDetailsCluster.getCluster();
                var rolesListCache = RolesListCache.getCache();
                var rolesSelectCache = RolesSelectCache.getCache();
                var userDetailsCluster = UserDetailsCluster.getCluster();

                rolesListCache.update({_id:role._id}, changes);
                rolesSelectCache.update({_id:role._id}, changes);
                roleDetailsCluster.update({_id:role._id}, changes);

                var user;

                console.log(changes);

                for (var id in userDetailsCluster.container) {
                    user = userDetailsCluster.container[id];

                    console.log(user);

                    if (user.data && user.data.roles && user.data.roles.dataLoaded) {
                        user.data.roles.update({'role._id':role._id},changes,'role');
                    }
                }
            } catch(err) {
                console.log(err);
            }

        }

        function deleteRole(role) {
            var roleDetailsCluster = RoleDetailsCluster.getCluster();
            var rolesListCache = RolesListCache.getCache();
            var rolesSelectCache = RolesSelectCache.getCache();
            var userDetailsCluster = UserDetailsCluster.getCluster();

            rolesListCache.remove({_id:role._id});
            rolesSelectCache.remove({_id:role._id});
            roleDetailsCluster.remove({_id:role._id});

            /// /userDetailsCluster.removeBatch({})

            var user;

            for (var id in userDetailsCluster.container) {
                user = userDetailsCluster.container[id];

                if (user.data && user.data.roles && user.data.roles.dataLoaded) {
                    user.data.roles.removeBatch({'role._id':role._id});
                }
            }
        }

        var service = {
            createRole: createRole,
            updateRole: updateRole,
            deleteRole: deleteRole
        };

        return service;
    }

    angular
        .module('hiraApp')
        .factory('RolesDataHandler', RolesDataHandler);
})());
