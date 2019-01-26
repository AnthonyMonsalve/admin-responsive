((function () {
    'use strict';

    /* @ngInject */
    function Connections($location,server) {
        var service = {},
            storage = {
                "access-server" :  server["access-server"],
                "business-server" :  server["business-server"],
                "catalogues-server" : server["catalogues-server"]            
            };


        function getAccessServer() {
            return storage["access-server"];
        }

        function getBusinessServer() {
            return storage["business-server"];
        }

        function getCataloguesServer() {
            return storage["catalogues-server"];
        }

        function getMailServer() {
            return storage["mail-server"];
        }

        /*jshint -W001 */
        service.getAccessServer = getAccessServer;
        service.getBusinessServer = getBusinessServer;
        service.getCataloguesServer = getCataloguesServer;
        service.getMailServer = getMailServer;

        return service;
    }

    angular
        .module('hiraApp.connections')
        .factory('Connections', Connections);
})());
