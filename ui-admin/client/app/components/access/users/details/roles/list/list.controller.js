((function () {

    'use strict';

    /*@ngInject*/
    function UserDetailsRolesListCtrl(UserRolesSvc,UserDetailsRolesListSvc,SweetAlert,NotificationsSvc) {
        var vm = this;

        vm.selected = [];

        function getUserRolesList(forceRemote,userId) {
            return UserDetailsRolesListSvc.getUserRolesList(forceRemote,userId).then(function(res){
                vm.userRoles = res;
            });
        }

        /*PRIVATE FUNCTIONS*/
        function activate() {
        }

        vm.$onInit = function(){
            getUserRolesList(false,vm.userId);
        };

        /*DEFINITION OF VARIABLES*/
        activate();

        function deleteUserRole(userRole) {
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
                UserRolesSvc.deleteUserRole(vm.userId,userRole)
                  .then(function(){
                    NotificationsSvc.fast("Successfully deleted","success");
                  })
                  .catch(function(err){
                    if (err.status == '400') {
                        vm.validationErrors = err.data;
                        NotificationsSvc.fast("Something happened","error");
                        return;
                    }

                    if (err.status == '500') {
                        NotificationsSvc.fast("Server error","error");
                        vm.serverError = 'Error creating action.';
                        return;
                    }
                  });
              }
            });
        }

        vm.getUserRolesList = getUserRolesList;
        vm.deleteUserRole = deleteUserRole;
    }

    angular.module('hiraApp')
        .controller('UserDetailsRolesListCtrl', UserDetailsRolesListCtrl);

})());
