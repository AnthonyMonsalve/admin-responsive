((function() {

    'use strict';

    /*@ngInject*/
    function histoReCtrl(histoReListSvc, SweetAlert, NotificationsSvc, common) {
        var vm = this;
        vm.selected = [];
        vm.today = new Date();
        vm.filter = histoReListSvc.getFilter();
        vm.query = vm.filter.query;
        vm.dataLoaded = false;
        vm.recarga= true
        vm.canjea = true
        vm.pago = true
        var $state = common.$state;

        function getOperationRef(id){
          return parseInt(id,16).toString(10).slice(10,16)
        }

        function getOperationType(type) {
            if (type === 'PagoRequest') {
                return 'Pago de Deuda';
            } else if (type === 'WithdrawalRequest') {
                return 'Canjeo';
            } else if (type === 'RechargeRequest') {
                return 'Recarga';
            }else if (type =='ContactUs'){
                return 'Contactanos'
            }
        }

        vm.goToDetails = (token)=>{
            console.log(token)
            $state.go('content.business.histore.details',{'clientId':token})
        }

        function getClients(forceRemote=false) {
            vm.solis = []
            vm.dataLoaded = false;
            vm.filter.query.recarga = vm.recarga
            vm.filter.query.canjea = vm.canjea
            vm.filter.query.pago = vm.pago
            console.log(vm.filter)
            return histoReListSvc.getRequest(forceRemote).then(function(clients) {
                vm.solis = clients.data
                for (let i = 0; i < vm.solis.length; i++) {
                    vm.solis[i].tipo = getOperationType(vm.solis[i].type)
                    vm.solis[i].ref = getOperationRef(vm.solis[i]._id)
                    //reconverShit
                    vm.solis[i].amount*=0.01
                }

                vm.dataLoaded = true
                console.log(vm.solis)
            });
        }

        vm.getClients = getClients

        vm.aprobado = (apro,modifi)=>{
            console.log(apro)
            console.log(modifi)
            if (apro===true || apro===false){
                return true
            }
            return false
        }

        /*PRIVATE FUNCTIONS*/
        vm.$onInit = function() {
            getClients(true);
        };

        function removeClientsBatch(client_ids) {
            SweetAlert.swal({
                    title: "¿Estas seguro?",
                    text: "Esta Operación no se puede deshacer.",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#f44336",
                    confirmButtonText: "Eliminar",
                    closeOnConfirm: true
                },
                function(resp) {
                    if (resp) {
                        fastSvc.removeClientsBatch(client_ids).then(function() {
                            getClients();
                            vm.selected = [];
                            NotificationsSvc.fast("Successfully deleted", "success");
                        });
                    }
                });
        }

        function sortBy(attr) {
            vm.dataLoaded = true;
            console.log(vm.dataLoaded);
            vm.filter.sortBy(attr);
            getClients(true);
        }

        vm.removeClientsBatch = removeClientsBatch;
        vm.sortBy = sortBy;
        vm.getClients = getClients;
    }

    angular.module('hiraApp')
        .controller('histoReCtrl', histoReCtrl);

})());
