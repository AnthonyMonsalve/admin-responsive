((function () {

    'use strict';

    /*@ngInject*/
    function RolesSelectCtrl(RolesSelectSvc) {
        var vm = this;

        function getRoles(forceRemote) {
            return RolesSelectSvc.getRoles(forceRemote).then(function(roles){
                vm.roles = roles;
            });
        }

        /*PRIVATE FUNCTIONS*/
        function activate() {
            getRoles(false);
        }

        activate();
    }

    angular.module('hiraApp')
        .controller('RolesSelectCtrl', RolesSelectCtrl);

})());
