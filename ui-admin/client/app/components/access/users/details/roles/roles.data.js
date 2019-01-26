/**
 * Created by daniel on 1/23/17.
 */

((function() {
    'use strict';

    /*@ngInject*/
    function UserRolesDataHandler(UserDetailsCluster) {

        function createUserRole(){

        }

        function updateUserRole(userRole,changes) {

        }

        function deleteUserRole(userId,userRole) {
            var userDetailsCluster = UserDetailsCluster.getCluster();
            var user = userDetailsCluster.container[userId];

            if (user.data && user.data.roles && user.data.roles.dataLoaded) {
                user.data.roles.remove({'_id':userRole._id});
            }
        }

        var service = {
            createUserRole: createUserRole,
            updateUserRole: updateUserRole,
            deleteUserRole: deleteUserRole
        };

        return service;
    }

    angular
        .module('hiraApp')
        .factory('UserRolesDataHandler', UserRolesDataHandler);
})());
