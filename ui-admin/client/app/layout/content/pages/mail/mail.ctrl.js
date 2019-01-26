((function () {

    'use strict';

    /*@ngInject*/
    function MailCtrl(SidebarContentSvc) {
        var vm = this;

        vm.getStatus = SidebarContentSvc.getStatus;

        /*PRIVATE FUNCTIONS*/
        function activate() {
            vm.sidebarStatus = SidebarContentSvc.getStatus();
        }

        /*DEFINITION OF VARIABLES*/
        activate();
    }

    angular.module('hiraApp.layout.content.pages.catalogues')
        .controller('MailCtrl', MailCtrl);

})());
