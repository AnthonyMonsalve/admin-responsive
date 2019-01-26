((function () {

    'use strict';

    /*@ngInject*/
    function UserDetailsRolesCreateCtrl(UserRolesSvc,UserDetailsRolesListSvc,NotificationsSvc) {
        var vm = this;

        vm.userRole = {};
        vm.validationErrors = [];
        vm.serverError = "";

        /*PRIVATE FUNCTIONS*/
        function activate() {
        }

        /*DEFINITION OF VARIABLES*/
        activate();

        function createUserRole(form,userId,roleId) {
            if (form.$valid) {
                var userRole = {
                    user: userId,
                    role: roleId
                };

                UserRolesSvc.createUserRole(userRole)
                    .then(function(){
                        vm.validationErrors = [];
                        vm.userRole = {};
                        NotificationsSvc.fast("Successfully added","success");
                        UserDetailsRolesListSvc.getUserRolesList(true,userId);
                    })
                    .catch(function(err){
                        if (err.status == '400') {
                            vm.validationErrors = err.data;
                            NotificationsSvc.fast("Item already exist","error");
                            return;
                        }

                        if (err.status == '500') {
                            NotificationsSvc.fast("Server error","error");
                            vm.serverError = 'Error creating action.';
                            return;
                        }
                    });
            } else {
              NotificationsSvc.fast("Bad data in form","error");
            }
        }

        vm.createUserRole = createUserRole;
    }

    angular.module('hiraApp')
        .controller('UserDetailsRolesCreateCtrl', UserDetailsRolesCreateCtrl);

})());
