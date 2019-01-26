((function () {

    'use strict';

    /*@ngInject*/
    function RolesDetailsViewCtrl(RoleDetailsSvc) {
        var vm = this;

        vm.role = {};

        function getRole(forceRemote,roleId) {
            return RoleDetailsSvc.getRole(forceRemote,roleId).then(function(role){
                vm.role = role;
            });
        }

        vm.$onInit = function() {
            getRole(false,vm.roleId);
        };
    }

    angular.module('hiraApp')
        .controller('RolesDetailsViewCtrl', RolesDetailsViewCtrl);

})());