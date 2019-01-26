((function () {

    'use strict';

    /*@ngInject*/
    function BusinessCtrl(SidebarContentSvc) {
        var vm = this;

        vm.getStatus = SidebarContentSvc.getStatus;

        /*PRIVATE FUNCTIONS*/
        function activate() {
            vm.sidebarStatus = SidebarContentSvc.getStatus();
        }

        /*DEFINITION OF VARIABLES*/
        activate();
    }

    angular.module('hiraApp.layout.content.pages.business')
        .controller('BusinessCtrl', BusinessCtrl);

})());
