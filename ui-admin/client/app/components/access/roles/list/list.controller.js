((function () {

    'use strict';

    /*@ngInject*/
    function RolesListCtrl(RolesSvc, SweetAlert, RolesListSvc,NotificationsSvc) {
        var vm = this;

        vm.selected = [];

        function getRoles(forceRemote) {
            return RolesListSvc.getRoles(forceRemote).then(function(roles){
                vm.roles = roles;
            });
        }

        /*PRIVATE FUNCTIONS*/
        function activate() {
            getRoles(false);
        }

        activate();

        function removeRolesBatch(roleIds){
            SweetAlert.swal({
                    title: "Are you sure?",
                    text: "This operation can not be undone.",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#f44336",
                    confirmButtonText: "Yes!",
                    closeOnConfirm: true
                },
                function(resp){
                    if (resp) {
                        RolesSvc.removeRolesBatch(roleIds).then(function(){
                            getRoles(true);
                            vm.selected = [];
                            NotificationsSvc.fast("Successfully deleted","success");
                        })
                    }
                });
        }

        vm.removeRolesBatch = removeRolesBatch;
        vm.getRoles = getRoles
    }

    angular.module('hiraApp')
        .controller('RolesListCtrl', RolesListCtrl);

})());
