((function() {

    'use strict';

    /*@ngInject*/
    function NavbarCtrl(common,Auth,SweetAlert,NavbarSvc) {
        var vm = this;

        //vm.isLoggedIn = Auth.isLoggedIn;
        vm.$state = common.$state;
        vm.currentUser = Auth.getCurrentUser();
        vm.hasRole = Auth.hasRole;
        vm.hasAccess = Auth.hasAccess;

        /*PRIVATE FUNCTIONS*/
        function activate() {
        }

        /*DEFINITION OF VARIABLES*/

        activate();

        function if_same_route(route) {
            return common.$state.current.name == route;
        }

        function logout() {
          SweetAlert.swal({
             title: "Are you sure?",
             text: "This window will be close",
             type: "warning",
             showCancelButton: true,
             confirmButtonColor: "#f44336",
             confirmButtonText: "Yes!",
             closeOnConfirm: true
          },
          function(resp){
            if (resp) {
              Auth.logout();
            }
          });

        }

        vm.logout = logout;
        vm.if_same_route = if_same_route;
        vm.currentMenuStatus = NavbarSvc.getStatus();
        vm.toggleMenu = NavbarSvc.toggleMenu;

        function tokenExpired() {
            Auth.showLoginModal();
        }

        vm.tokenExpired = tokenExpired;
    }

    angular.module('hiraApp.layout.content.navbar')
        .controller('NavbarCtrl', NavbarCtrl);

})());
