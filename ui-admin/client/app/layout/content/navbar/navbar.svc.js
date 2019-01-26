/**
 * Created by andres on 7/28/16. (It's OK DOM manipulation in Services)
 */
((function () {
    'use strict';

    function NavbarSvc(common, SweetAlert) {
        var service = {},
            storage = {
                "status" : false
            };

        /*DEFINITION OF VARIABLES*/

        function toggleMenu() {
            storage.status = !storage.status;
        }   

        function openMenu() {
            storage.status = true;
        }

        function closeMenu() {
            storage.status = false;
        }

        function getStatus() {
            return storage
        }

        /*PUBLIC FUNCTIONS*/
        service.toggleMenu = toggleMenu;
        service.openMenu = openMenu;
        service.closeMenu = closeMenu;
        service.getStatus = getStatus;

        return service;
    }

    angular
        .module('hiraApp.layout.content.navbar')
        .factory('NavbarSvc', NavbarSvc);
})());
