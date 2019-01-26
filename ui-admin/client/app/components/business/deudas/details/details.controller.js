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
                vm.client = client.data;
                vm.client.balance = Math.ceil(vm.client.balance)
                console.log(client);
            });
        }
        function getClientReco(forceRemote,clientId) {
            return ClientDetailsSvc.getClient(forceRemote,clientId).then(function(client){
                vm.client2 = client.data;
                vm.client2.balance = Math.ceil(vm.client2.balance)
                console.log(client);
            });
        }

        vm.$onInit = function() {
            getClient(true,vm.clientId)
            getClientReco(true,vm.clientId)
        };

        vm.showdebt = ()=>{
            vm.showDe= !vm.showDe
        }

        vm.recuerda = ()=>{
          ClientsSvc.recuerda(vm.client.email,vm.client.username, vm.client.deuda).then(()=>{
            NotificationsSvc.fast("Tu mensaje ha sido enviado", "success");
          }).catch(()=>{
            NotificationsSvc.fast("Ha ocurrido un error", "error");
          })
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
        .controller('DebDetailsViewCtrl', ClientDetailsViewCtrl);

})());
