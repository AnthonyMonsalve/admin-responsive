/**
 * Created by daniel on 1/23/17.
 */

((function() {
    'use strict';

    /*@ngInject*/
    function RoleActionPermissionsDataHandler(RoleDetailsCluster) {

        function createRoleActionPermission(){

        }

        function updateRoleActionPermission(roleActionPermission,changes) {

        }

        function deleteRoleActionPermission(roleActionPermission) {
            var roleDetailsCluster = RoleDetailsCluster.getCluster();
            var role = roleDetailsCluster.container[roleActionPermission.role];

            if (role.data && role.data.actions && role.data.actions.dataLoaded) {
                role.data.actions.remove({'_id':roleActionPermission._id});
            }
        }

        var service = {
            createRoleActionPermission: createRoleActionPermission,
            updateRoleActionPermission: updateRoleActionPermission,
            deleteRoleActionPermission: deleteRoleActionPermission
        };

        return service;
    }

    angular
        .module('hiraApp')
        .factory('RoleActionPermissionsDataHandler', RoleActionPermissionsDataHandler);
})());
