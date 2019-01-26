((function() {

    'use strict';

    /*@ngInject*/
    function AccessNavbarCtrl(common,Auth,SidebarContentSvc) {
        var vm = this;

        vm.$state = common.$state;
        vm.toggleStatus = SidebarContentSvc.toggleStatus;
        vm.hasAccess = Auth.hasAccess;

        /*PRIVATE FUNCTIONS*/
        function activate() {
          vm.sidebarStatus = SidebarContentSvc.getStatus();
        }

        /*DEFINITION OF VARIABLES*/

        activate();

        function if_same_route(route) {
            return common.$state.current.name == route;
        }

        vm.if_same_route = if_same_route;
    }

    angular.module('hiraApp.layout.content.pages.access')
        .controller('AccessNavbarCtrl', AccessNavbarCtrl);

})());
