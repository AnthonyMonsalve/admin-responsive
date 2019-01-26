((function() {
    'use strict';

    /*@ngInject*/
    function promoSvc(common, localStorageService, DiarioDataHandler, Connections, $cookies) {
        var $http = common.$http;
        var storage = localStorageService;
        var baseUrl = Connections.getBusinessServer() + '/business/clients';
        var baseUrlOp = Connections.getBusinessServer() + '/business/operations';
        var baseUrlRe = Connections.getBusinessServer() + '/business/requests';

        function operaData(mes,year){
            return $http({
                url: baseUrlOp + '/prodata',
                headers:{Authorization: $cookies.get('token'), user: storage.get('username')},
                method: 'GET',
                params: {'mes':mes,'year':year}
            })
        }

        function reUsers(){
            return $http({
                url: baseUrl + '/countPerson',
                headers:{Authorization: $cookies.get('token'), user: storage.get('username')},
                method: 'GET'
            })
        }


        var service = {
            operaData: operaData,
            userStats:reUsers
        };

        return service;
    }

    angular
        .module('hiraApp')
        .factory('diarioSvc', promoSvc);
})());