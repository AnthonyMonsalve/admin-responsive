((function() {

    'use strict';

    /*@ngInject*/
    function promoListCtrl(diarioSvc,diarioListSvc, SweetAlert, NotificationsSvc) {
        var vm = this;
        vm.selected = [];
        vm.today = new Date();
        vm.filter = diarioListSvc.getFilter();
        vm.query = vm.filter.query;
        vm.dataLoaded = false;


        vm.mes = (new Date()).getMonth()+1
        vm.year = (new Date()).getFullYear()


        function getClients() {
            vm.lista=[]
            vm.operaciones = []
            vm.deuda=false
            vm.recarga = false
            vm.pago = false
            vm.canje = false
            vm.userStats = {}

            diarioSvc.userStats().then(function(data){
                console.log(data)
                vm.reUsers=data.data.total
                vm.activeUsers=data.data.clienteActivas
                vm.nactiveUsers = data.data.clienteNoActivas
                vm.promoUsers = data.data.promo
                vm.emUsers=data.data.employee
            })


            for (let i = 0; i < 31; i++) {
                vm.lista[i]={'dia':i+1,'total':0}
            }
            let i=1
            vm.operaciones[0]={'name':'Día','data':vm.lista}
            //vm.lista.push({'dia':'TOTAL'})
            vm.dataLoaded = false;
            return diarioSvc.operaData(vm.mes,vm.year).then(function(opera){
                //console.info(opera)
                var op = opera.data
                //console.info(op)
                //Cada bloquesito de estos verifica si existe el campo de operacion dado y luego llena por dia el monto total de la operacion dada
                if (op.deuda){
                    vm.deuda=true
                    vm.operaciones[i]={'name':'Deudas','data':op.deuda}
                    for (let j=0; j < 31; j++){
                        vm.lista[j].deuda=0
                        for (let x=0;x<op.deuda.length;x++){
                            if (op.deuda[x].dia==j+1){
                                vm.lista[j].deuda=op.deuda[x].total.toLocaleString('de-DE')
                            }
                        }
                    }
                    i++
                }
                if (op.recarga){
                    vm.recarga=true
                    vm.operaciones[i]={'name':'Recargas','data':op.recarga}
                    for (let j=0; j < 31; j++){
                        vm.lista[j].recarga=0
                        for (let x=0;x<op.recarga.length;x++){
                            if (op.recarga[x].dia==j+1){
                                vm.lista[j].recarga=op.recarga[x].total.toLocaleString('de-DE')
                            }
                        }
                    }
                    i++
                }
                if (op.pago){
                    vm.pago=true
                    vm.operaciones[i]={'name':'Pagos','data':op.pago}
                    for (let j=0; j < 31; j++){
                        vm.lista[j].pago=0
                        for (let x=0;x<op.pago.length;x++){
                            if (op.pago[x].dia==j+1){
                                vm.lista[j].pago=op.pago[x].total.toLocaleString('de-DE')
                            }
                        }
                    }
                    i++
                }
                if (op.canje){
                    vm.canje=true
                    vm.operaciones[i]={'name':'Canjeos Netos','data':op.canje}
                    vm.operaciones[i+1]={'name':'Canjeos Brutos','data':op.canje}
                    vm.operaciones[i+2]={'name':'Ganancias'}
                    for (let j=0; j < 31; j++){
                        vm.lista[j].canjen=0
                        vm.lista[j].canjeb=0
                        vm.lista[j].gain=0
                        for (let x=0;x<op.canje.length;x++){
                            if (op.canje[x].dia==j+1){
                                vm.lista[j].canjen=op.canje[x].total.toLocaleString('de-DE')
                                vm.lista[j].canjeb=(op.canje[x].total/0.9).toLocaleString('de-DE')
                                vm.lista[j].gain = (parseInt(vm.lista[j].canjeb.replace(/[\s\._\-]+/g, "").replace(',','.'))-parseInt(vm.lista[j].canjen.replace(/[\s\._\-]+/g, "").replace(',','.'))).toLocaleString('de-DE')
                            }
                        }
                    }
                    i++
                }
                console.log(vm.lista)
                vm.dataLoaded = true
            })
        }

        /*PRIVATE FUNCTIONS*/
        vm.$onInit = function() {
            getClients();
        };
/* 
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
        } */

        function sortBy(attr) {
            vm.dataLoaded = true;
            console.log(vm.dataLoaded);
            vm.filter.sortBy(attr);
            getClients();
        }
        vm.sortBy = sortBy;
        vm.getClients = getClients;
    }

    angular.module('hiraApp')
        .controller('diarioListCtrl', promoListCtrl);

})());
