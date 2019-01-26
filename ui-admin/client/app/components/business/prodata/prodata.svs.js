((function() {
    'use strict';

    /*@ngInject*/
    function promoSvc(common, localStorageService, DiarioDataHandler, Connections, $cookies) {
        var $http = common.$http;
        var storage = localStorageService;
        var baseUrl = Connections.getBusinessServer() + '/business/clients';
        var baseUrlOp = Connections.getBusinessServer() + '/business/operations';
        var baseUrlRe = Connections.getBusinessServer() + '/business/requests';

        function operaData(desde=7,hasta=2018,query=[]){
            return $http({
                url: baseUrlOp + '/prodata',
                headers:{Authorization: $cookies.get('token'), user: storage.get('username')},
                method: 'GET',
                params: {'desde':desde,'hasta':hasta,'q':query}
            })
        }

        function reUsers(desde=new Date(new Date().getFullYear(),new Date().getMonth()-1,new Date().getDate()), hasta=new Date(),margen=new Date(new Date().getFullYear(),new Date().getMonth()-1,new Date().getDate())){
            return $http({
                url: baseUrl + '/countPerson',
                headers:{Authorization: $cookies.get('token'), user: storage.get('username')},
                method: 'GET',
                params:{'desde':desde,'hasta':hasta, 'margen':margen}
            })
        }

        function freqUsers(margen=new Date(new Date().getFullYear(), new Date().getMonth()-1,new Date().getDate())){
            return $http({
                url: baseUrl + '/frequsers',
                headers:{Authorization: $cookies.get('token'), user: storage.get('username')},
                method: 'GET',
                params:{'margen':margen}
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
        .factory('prodataSvc', promoSvc);
})());