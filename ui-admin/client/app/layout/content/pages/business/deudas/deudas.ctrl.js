((function() {

    'use strict';

    /*@ngInject*/
    function HistoReCtrl(Connections,common,localStorageService,$cookies) {
        var vm = this;
        var baseUrl = Connections.getBusinessServer() + '/business/clients';
        var $http = common.$http;
        vm.$state = common.$state;
        var storage = localStorageService;

       //Gets the total deuda in the DB
       $http({
        url: baseUrl + '/deuda_total',
        headers:{Authorization: $cookies.get('token'), user: storage.get('username')},
        method: 'GET'
        }).then((resp)=>{
            //reconverShit
            resp.data*=0.01
            vm.deudaTotal = resp.data.toLocaleString('de-DE') 
        })

    }

    angular.module('hiraApp.layout.content.pages.business')
        .controller('DeudasCtrl', HistoReCtrl);

})());