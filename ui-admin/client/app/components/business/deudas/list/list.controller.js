((function() {

    'use strict';

    /*@ngInject*/
    function histoReCtrl(deudasListSvc, SweetAlert, NotificationsSvc, common) {
        var vm = this;
        vm.selected = [];
        vm.today = new Date();
        vm.filter = deudasListSvc.getFilter();
        vm.query = vm.filter.query;
        vm.dataLoaded = false;
        var $state = common.$state;


        function getDelay(fecha=new Date()) {
            const hoy = new Date()

            var timeDiff = Math.abs(fecha.getTime() - hoy.getTime());
            var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

            return diffDays
        }

        vm.goToDetails = (token)=>{
            console.log(token)
            $state.go('content.business.deudas.details',{'clientId':token})
        }

        function getClients(forceRemote=false) {
            vm.clients = []
            vm.dataLoaded = false;
            console.log(vm.filter)
            return deudasListSvc.getRequest(forceRemote).then(function(clients) {
                vm.clients = clients.data
                console.log(vm.clients)
                for (let i = 0; i < vm.clients.length; i++) {
                    vm.clients[i].atraso = getDelay(vm.clients[i].createdAt)
                    //reconverShit
                    vm.clients[i].deuda*=0.01
                    vm.clients[i].deuda = vm.clients[i].deuda.toLocaleString('de-DE')
                }
                vm.dataLoaded = true
                console.log(vm.clients)
            });
        }

        vm.getClients = getClients

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
        .controller('deudasCtrl', histoReCtrl);

})());
