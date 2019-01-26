((function () {

    'use strict';

    /*@ngInject*/
    function RolesCreateCtrl(common,RolesSvc,NotificationsSvc) {
        var vm = this;

        var $state = common.$state;

        vm.role = {};
        vm.validationErrors = [];
        vm.serverError = "";

        /*PRIVATE FUNCTIONS*/
        function activate() {
        }

        /*DEFINITION OF VARIABLES*/
        activate();

        function createRole(form,role) {
            if (form.$valid) {
                RolesSvc.createRole(role)
                    .then(function(){
                        vm.validationErrors = [];
                        vm.role = {};
                        NotificationsSvc.fast("Successfully created","success");
                        $state.go('content.access.roles.list');
                    })
                    .catch(function(err){
                        console.log(err);
                        if (err.status == '400') {
                            vm.validationErrors = err.data;
                            return;
                        }

                        if (err.status == '500') {
                            vm.serverError = 'Error creating role.';
                            return;
                        }
                    });
            } else {
              NotificationsSvc.fast("Bad data in form","error");
            }
        }

        vm.createRole = createRole;
    }

    angular.module('hiraApp')
        .controller('RolesCreateCtrl', RolesCreateCtrl);

})());