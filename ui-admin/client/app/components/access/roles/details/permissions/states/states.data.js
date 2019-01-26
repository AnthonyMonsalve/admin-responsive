/**
 * Created by daniel on 1/23/17.
 */

((function() {
    'use strict';

    /*@ngInject*/
    function RoleStatePermissionsDataHandler(RoleDetailsCluster) {

        function createRoleStatePermission(){

        }

        function updateRoleStatePermission(roleStatePermission,changes) {

        }

        function deleteRoleStatePermission(roleStatePermission) {
            var roleDetailsCluster = RoleDetailsCluster.getCluster();
            var role = roleDetailsCluster.container[roleStatePermission.role];

            if (role.data && role.data.states && role.data.states.dataLoaded) {
                role.data.states.remove({'_id':roleStatePermission._id});
            }
        }

        var service = {
            createRoleStatePermission: createRoleStatePermission,
            updateRoleStatePermission: updateRoleStatePermission,
            deleteRoleStatePermission: deleteRoleStatePermission
        };

        return service;
    }

    angular
        .module('hiraApp')
        .factory('RoleStatePermissionsDataHandler', RoleStatePermissionsDataHandler);
})());
