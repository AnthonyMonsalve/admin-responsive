((function () {

    'use strict';

    /*@ngInject*/
    function RoleDetailsActionPermissionsListCtrl(RoleDetailsActionPermissionsListSvc) {
        var vm = this;

        function getRoleActionPermissionsList(forceRemote,roleId) {
            return RoleDetailsActionPermissionsListSvc.getRoleActionPermissionsList(forceRemote,roleId).then(function(res){
                vm.roleActionPermissions = res;
            });
        }

        function getResourcesActions(forceRemote,roleId) {
            return RoleDetailsActionPermissionsListSvc.getResourcesActions(forceRemote,roleId).then(function(res){
                vm.resources = res;
            });
        }

        /*PRIVATE FUNCTIONS*/
        function activate() {
        }

        vm.$onInit = function(){
            getRoleActionPermissionsList(false,vm.roleId);
            getResourcesActions(false,vm.roleId);
        };

        /*DEFINITION OF VARIABLES*/
        activate();

        function refresh(){
            getRoleActionPermissionsList(true,vm.roleId);
            getResourcesActions(true,vm.roleId);
        }

        vm.refresh = refresh;
    }

    angular.module('hiraApp')
        .controller('RoleDetailsActionPermissionsListCtrl', RoleDetailsActionPermissionsListCtrl);

})());