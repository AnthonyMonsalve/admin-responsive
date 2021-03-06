((function() {

    'use strict';

    /*@ngInject*/
    function CataloguesNavbarCtrl(common,Auth,SidebarContentSvc) {
        var vm = this;

        vm.$state = common.$state;
        vm.toggleStatus = SidebarContentSvc.toggleStatus;
        vm.hasRole = Auth.hasRole;
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

    angular.module('hiraApp.layout.content.pages.catalogues')
        .controller('CataloguesNavbarCtrl', CataloguesNavbarCtrl);

})());
