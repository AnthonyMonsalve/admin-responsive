((function () {

    'use strict';

    /*@ngInject*/
    function RoleDetailsActionPermissionsListActionsCtrl(ActionPermissionsSvc) {
        var vm = this;

        vm.selected = [];

        /*PRIVATE FUNCTIONS*/
        function activate() {
        }


        /*DEFINITION OF VARIABLES*/
        activate();

        vm.togglePermission = ActionPermissionsSvc.togglePermission;
    }

    angular.module('hiraApp')
        .controller('RoleDetailsActionPermissionsListActionsCtrl', RoleDetailsActionPermissionsListActionsCtrl);

})());
