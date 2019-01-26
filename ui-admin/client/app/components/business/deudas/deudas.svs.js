((function() {
    'use strict';

    /*@ngInject*/
    function histoReSvc(common, localStorageService, Connections, $cookies) {
        var $http = common.$http;
        var storage = localStorageService;
        var baseUrl = Connections.getBusinessServer() + '/business/clients';
        var baseUrlOp = Connections.getBusinessServer() + '/business/operations';
        var baseUrlRe = Connections.getBusinessServer() + '/business/requests';
        //var baseUrl = 'http://172.17.0.3:5006/access/borrowers';


        function RequestList(query){
            console.info(query)
            return $http({
                url: baseUrl + '/deudosos',
                headers:{Authorization: $cookies.get('token'), user: storage.get('username')},
                method: 'GET',
                params: query
            })
        }


        var service = {
            RequestList:RequestList
        };

        return service;
    }

    angular
        .module('hiraApp')
        .factory('DeudasSvc', histoReSvc);
})());