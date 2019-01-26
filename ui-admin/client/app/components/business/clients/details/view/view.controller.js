((function () {

    'use strict';

    /*@ngInject*/
    function ClientDetailsViewCtrl(common,ClientDetailsSvc,ClientsDetailsCluster,ClientsSvc, NotificationsSvc) {
        var vm = this;
        vm.showDe=false;
        vm.client = {};
        vm.cluster = ClientsDetailsCluster.getCluster();

        function getClient(forceRemote,clientId) {
            return ClientDetailsSvc.getClient(forceRemote,clientId).then(function(client){
                //reconver modification to show the rigth amount
                client.data.balance*=0.01
                client.data.deuda*=0.01
                client.data.balance = client.data.balance.toLocaleString('de-DE')
                client.data.deuda = client.data.deuda.toLocaleString('de-DE')
                vm.client = client.data;
                
                console.log(client);
            });
        }/* 
        function getClientReco(forceRemote,clientId) {
            return ClientDetailsSvc.getClient(forceRemote,clientId).then(function(client){
                vm.client2 = client.data;
                vm.client2.balance = Math.ceil(vm.client2.balance)
                console.log(client);
            });
        } */

        vm.$onInit = function() {
            getClient(true,vm.clientId)/* 
            getClientReco(true,vm.clientId) */
        };

        vm.showdebt = ()=>{
            vm.showDe= !vm.showDe
        }

        function getType(type) {
          if (type == "ContactUs")
            return "Solicitud de contacto";
          else if (type == "WithdrawalRequest")
              return "Solicitud de retiro";
          else if (type == "RechargeRequest")
              return "Solicitud de recarga";
          else if (type == "BankAccountActivation")
              return "Solicitud de activación de cuenta"
        }

        vm.getType = getType;  

        function doOperation(client) {
            ClientsSvc.handlerOperation(client).then(function(res){
                NotificationsSvc.fast("Solicitud archivada","success");
                common.$state.go("content.business.requests.list");
                console.log(res);
            }).catch(function(err){
                console.log(err);
            }); 
        }

        vm.doOperation = doOperation   
    }

    angular.module('hiraApp')
        .controller('ClientDetailsViewCtrl', ClientDetailsViewCtrl);

})());