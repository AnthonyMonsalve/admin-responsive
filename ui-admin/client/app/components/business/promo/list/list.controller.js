((function() {

    'use strict';

    /*@ngInject*/
    function promoListCtrl(promoSvc,fastListSvc, SweetAlert, NotificationsSvc) {
        var vm = this;
        vm.selected = [];
        vm.today = new Date();
        vm.filter = fastListSvc.getFilter();
        vm.query = vm.filter.query;
        vm.dataLoaded = false;


        vm.mes = (new Date()).getMonth()+1


        function getClients() {
            vm.clients = []
            vm.lista=[]
            vm.operaciones = []
            for (let i = 0; i < 31; i++) {
                vm.lista[i]={'dia':i+1,'total':0}
            }
            vm.lista.push({'dia':'TOTAL'})
            vm.dataLoaded = false;
            return promoSvc.menPromo(vm.mes).then(function(clients) {
                vm.clients = clients.data;
                vm.dataLoaded = true;

                console.log(vm.clients)
                for (let i=0; i<vm.clients.length; i++){
                    var acumula = 0
                    vm.operaciones= vm.clients[i].operaciones
                    for(let j=0;j< vm.operaciones.length ;j++){
                        //reconverShits 
                        vm.operaciones[j].total*=0.01
                        vm.lista[vm.operaciones[j].dia-1]['total']+=vm.operaciones[j].total
                        vm.lista[vm.operaciones[j].dia-1]['Promo'+i]=vm.operaciones[j].total.toLocaleString('de-DE')
                        acumula = acumula + vm.operaciones[j].total
                    }
                    vm.lista[31]['Promo'+i]=acumula.toLocaleString('de-DE')
                }
                console.log('lista: ',vm.lista)
                // console.log('Tamaño de los clientes: ',vm.clients[0].operaciones);
                // console.log('que carajos es esto',vm.lista[0].Promo);

                  for (var i = 0; i < vm.lista.length; i++) {
                    if (vm.lista[i].total) {
                      vm.lista[i].total = vm.lista[i].total.toLocaleString('de-DE')
                    }
                  }

                // console.log('total de elemento 0 de la lista', vm.lista[0].total.toLocaleString('de-DE'));
            });
        }

        /*PRIVATE FUNCTIONS*/
        vm.$onInit = function() {
            getClients();
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
            getClients();
        }

        vm.removeClientsBatch = removeClientsBatch;
        vm.sortBy = sortBy;
        vm.getClients = getClients;
    }

    angular.module('hiraApp')
        .controller('promoListCtrl', promoListCtrl);

})());
