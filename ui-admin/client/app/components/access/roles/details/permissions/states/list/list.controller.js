((function () {

    'use strict';

    /*@ngInject*/
    function RoleDetailsStatePermissionsListCtrl(RoleDetailsStatePermissionsListSvc,StatePermissionsSvc) {
        var vm = this;

        function getRoleStatePermissionsList(forceRemote,roleId) {
            return RoleDetailsStatePermissionsListSvc.getRoleStatePermissionsList(forceRemote,roleId).then(function(res){
                vm.roleStatePermissions = res;
            });
        }

        function getStates(forceRemote) {
            return RoleDetailsStatePermissionsListSvc.getStates(forceRemote).then(function(res){
                vm.states = res;
            });
        }

        /*PRIVATE FUNCTIONS*/
        function activate() {
        }

        vm.$onInit = function(){
            getRoleStatePermissionsList(false,vm.roleId);
            getStates(false,vm.roleId);
        };

        /*DEFINITION OF VARIABLES*/
        activate();

        function refresh(){
            getRoleStatePermissionsList(true,vm.roleId);
            getStates(true,vm.roleId);
        }

        vm.togglePermission = StatePermissionsSvc.togglePermission;
        vm.refresh = refresh;
    }

    angular.module('hiraApp')
        .controller('RoleDetailsStatePermissionsListCtrl', RoleDetailsStatePermissionsListCtrl);

})());