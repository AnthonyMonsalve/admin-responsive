((function () {

    'use strict';

    /*@ngInject*/
    function RoleDetailsEditCtrl(common,RolesSvc, RoleDetailsSvc,NotificationsSvc) {
        var vm = this;

        var findDiff = common.findDiff;

        vm.validationErrors = [];
        vm.serverError = "";

        vm.role = {};
        vm.edit = {};

        function getRole(forceRemote,roleId) {
            return RoleDetailsSvc.getRole(forceRemote,roleId).then(function(role){
                vm.role = role;
                reset();
            });
        }

        vm.$onInit = function() {
            getRole(false,vm.roleId);
        };

        /*PRIVATE FUNCTIONS*/
        function reset() {
            vm.edit = angular.copy(vm.role.data);
        }

        function updateRole(form,roleId){
            if (form.$valid) {
                var changes = findDiff(vm.role.data,vm.edit);

                if (Object.keys(changes).length == 0) {
                    NotificationsSvc.fast("No changes detected","warning");
                    return;
                }

                RolesSvc.updateRole(roleId,changes)
                    .then(function(){
                        form.$setPristine();
                        vm.validationErrors = [];
                        NotificationsSvc.fast("Changes saved","success");
                    })
                    .catch(function(err){
                        if (err.status == '400') {
                            vm.validationErrors = err.data;
                            return;
                        }

                        if (err.status == '500') {
                            vm.serverError = 'Server error!';
                            return;
                        }
                    });
            }
        }

        vm.reset = reset;
        vm.updateRole = updateRole;

    }

    angular.module('hiraApp')
        .controller('RoleDetailsEditCtrl', RoleDetailsEditCtrl);

})());