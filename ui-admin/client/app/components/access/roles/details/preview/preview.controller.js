((function () {

    'use strict';

    /*@ngInject*/
    function RolesDetailsPreviewCtrl(RolesSvc) {
        var vm = this;

        vm.role = {};

        function getRole(forceRemote,roleId) {
            return RolesSvc.getRole(forceRemote,roleId).then(function(role){
                vm.role = role;
            });
        }

        vm.$onInit = function() {
            getRole(false,vm.roleId);
        };
    }

    angular.module('hiraApp')
        .controller('RolesDetailsPreviewCtrl', RolesDetailsPreviewCtrl);

})());