((function() {

    'use strict';

    /*@ngInject*/
    function promoListCtrl(prodataSvc,diarioListSvc, SweetAlert, NotificationsSvc) {
        var vm = this;
        vm.selected = [];
        vm.today = new Date();
        vm.filter = diarioListSvc.getFilter();
        vm.query = vm.filter.query;
        vm.dataLoaded = false;
        let fecha = new Date()
        vm.hasta = fecha
        vm.desde = new Date(fecha.getFullYear(),fecha.getMonth()-1,fecha.getDate())


        function getClients(p=0) {
            vm.lista=[]
            vm.head = []
            vm.transferencia = false


            //diferencia entre desde y hasta
            let diff = Math.ceil(Math.abs(vm.hasta.getTime()-vm.desde.getTime())/(1000*3600*24))
            console.log(diff);
            //Genera la lista de fechas a mostrar
            for (let i = 0; i <diff; i++) {
                var dat = new Date(vm.desde.getFullYear(),vm.desde.getMonth(),vm.desde.getDate()+i+p,vm.desde.getHours()-4,0,0,0)
                var dat2 =new Date(vm.desde.getFullYear(),vm.desde.getMonth(),vm.desde.getDate()+i+p,vm.desde.getHours()+1,0,0,0)
                vm.lista[i]={'dia':dat,'total':0,'dia_s':dat2}
            }
            vm.lista[diff]={'dia':'Total','dia_s':'Total'}

            //console.log(vm.lista)
            //vm.head establece las cabeceras
            vm.head=[
                {'name':'Fecha','data':vm.lista},
                {'name':'Cantidad de operaciones'},
                {'name':'Cantidad de Usuarios'},
                {'name':'total'}
            ]

            //Cargando data del server
            vm.dataLoaded = false;
            return prodataSvc.operaData(vm.desde,vm.hasta,['transferencia']).then(function(opera){
                var op = opera.data
                //totales
                var totalOperaciones=0
                var totalTransferenciaDia=0
                //Si recibo la data que quiero establecida en ['recarga']
                if (op.transferencia){
                    vm.transferencia=true

                    console.log('op.transferencia: ',op.transferencia)
                    //A partir de aqui organizo la data que quiero mostrar, la data del server la organizo con la lista para ser mostrada
                    //este ciclo recorre la lista setiando los valores a 0 para luego con el otro ciclo modificar solo con la data que tengo
                    for (let j=0; j < diff; j++){
                        vm.lista[j].transferenciaDia=0
                        vm.lista[j].cuenta=0
                        vm.lista[j].users=0
                        //Este ciclo recorre la data recibida del servidor en busca de la data correspondiente a cada fecha
                        for (let x=0;x<op.transferencia.length;x++){
                            //resta la fecha de la lista con la obtenida del servidor hace el match y guarda la data que me importa.
                            let diff2= op.transferencia[x].fecha.getTime()-vm.lista[j].dia.getTime()
                            if (diff2==0){
                                op.transferencia[x].total=op.transferencia[x].total*0.01
                                vm.lista[j].cuenta=op.transferencia[x].count
                                vm.lista[j].users=op.transferencia[x].usuarios.length
                                vm.lista[j].transferenciaDia=op.transferencia[x].total.toLocaleString('de-DE')
                                totalOperaciones=totalOperaciones+op.transferencia[x].count
                                totalTransferenciaDia=totalTransferenciaDia+op.transferencia[x].total
                            }
                        }
                    }
                    //Totalizo las cantidades
                    vm.lista[diff].cuenta=totalOperaciones.toLocaleString('de-DE')
                    vm.lista[diff].transferenciaDia=totalTransferenciaDia.toLocaleString('de-DE')
                }
                console.log('vm.lista: ',vm.lista)
                vm.dataLoaded = true
            })
        }

        /*PRIVATE FUNCTIONS*/
        vm.$onInit = function() {
            getClients();
        };

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
        .controller('transferenciaListCtrl', promoListCtrl);

})());
