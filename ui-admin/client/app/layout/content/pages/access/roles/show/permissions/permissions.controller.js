((function () {

    'use strict';

    /*@ngInject*/
    function AccessRolesShowPermissionsCtrl(common) {
        var vm = this;

        var $stateParams = common.$stateParams;

        vm.roleId = $stateParams.roleId;

        /*PRIVATE FUNCTIONS*/
        function activate() {
        }

        /*DEFINITION OF VARIABLES*/
        activate();
    }

    angular.module('hiraApp.layout.content.pages.access')
        .controller('AccessRolesShowPermissionsCtrl', AccessRolesShowPermissionsCtrl);

})());