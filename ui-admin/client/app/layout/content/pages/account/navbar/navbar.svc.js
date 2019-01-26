/**
 * Created by andres on 2/2/17.
 */

((function() {
    'use strict';

    /*@ngInject*/
    function SidebarContentSvc() {

        var storage = {
          isClose: false
        };

        function getStatus() {
          return storage;
        }

        function toggleStatus() {
          storage.isClose = !storage.isClose;
        }

        var service = {
            getStatus: getStatus,
            toggleStatus: toggleStatus
        };

        return service;
    }

    angular
        .module('hiraApp')
        .factory('SidebarContentSvc', SidebarContentSvc);
})());
