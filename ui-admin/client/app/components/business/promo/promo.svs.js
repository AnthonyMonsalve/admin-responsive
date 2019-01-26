((function() {
    'use strict';

    /*@ngInject*/
    function promoSvc(common, localStorageService, ClientsDataHandler, Connections, $cookies) {
        var $http = common.$http;
        var storage = localStorageService;
        var baseUrl = Connections.getBusinessServer() + '/business/clients';
        var baseUrlOp = Connections.getBusinessServer() + '/business/operations';
        var baseUrlRe = Connections.getBusinessServer() + '/business/requests';
        //var baseUrl = 'http://172.17.0.3:5006/access/borrowers';

        function payday(id){
            return $http({
                url: baseUrlOp + '/recharges/bill',
                headers:{Authorization: $cookies.get('token'), user: storage.get('username')},
                method: 'POST',
                data: {'recarga':id}
            })
        }

        function menPromo(mes){
            return $http({
                url: baseUrlOp + '/promod',
                headers:{Authorization: $cookies.get('token'), user: storage.get('username')},
                method: 'GET',
                params: {'mes':mes}
            })
        }


        var service = {
            payday: payday,
            menPromo:menPromo
        };

        return service;
    }

    angular
        .module('hiraApp')
        .factory('promoSvc', promoSvc);
})());