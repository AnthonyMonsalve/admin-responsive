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


        function getClients(p=1) {
            vm.lista=[]
            vm.head = []
            vm.canje = false


            //diferencia entre desde y hasta
            let diff = Math.ceil(Math.abs(vm.hasta.getTime()-vm.desde.getTime())/(1000*3600*24))

            //Genera la lista de fechas a mostrar
            for (let i = 0; i <diff; i++) {
                var dat = new Date(vm.desde.getFullYear(),vm.desde.getMonth(),vm.desde.getDate()+i+p,vm.desde.getHours()-4,0,0,0)
                //var dat2 =new Date(vm.desde.getFullYear(),vm.desde.getMonth(),vm.desde.getDate()+i+p,vm.desde.getHours()+1,0,0,0)
                vm.lista[i]={'dia':dat,'total':0}
            }
            vm.lista[diff]={'dia':'Total','dia_s':'Total'}

            //console.log(vm.lista)
            //vm.head establece las cabeceras
            vm.head=[
                {'name':'Fecha','data':vm.lista},
                {'name':'Operaciones'},
                {'name':'Canjeos Netos'},
                {'name':'Canjeos Brutos'},
                {'name':'Ganancias'}
            ]

            //Cargando data del server
            vm.dataLoaded = false;
            return prodataSvc.operaData(vm.desde,vm.hasta,['canje']).then(function(opera){
                //console.info(opera)
                var op = opera.data
                //totales
                var top=0
                var tgain=0
                var tcanjen=0
                var tcanjeb=0
                //Si recibo la data que quiero establecida en ['canje']
                if (op.canje){
                    vm.canje=true

                    console.log(op.canje)
                    //A partir de aqui organizo la data que quiero mostrar, la data del server la organizo con la lista para ser mostrada
                    //este ciclo recorre la lista setiando los valores a 0 para luego con el otro ciclo modificar solo con la data que tengo
                    for (let j=0; j < diff; j++){
                        vm.lista[j].canjen=0
                        vm.lista[j].canjeb=0
                        vm.lista[j].gain=0
                        vm.lista[j].cuenta=0
                        //Este ciclo recorre la data recibida del servidor en busca de la data correspondiente a cada fecha
                        for (let x=0;x<op.canje.length;x++){
                            //resta la fecha de la lista con la obtenida del servidor hace el match y guarda la data que me importa.
                            let diff2= op.canje[x].fecha.getTime()-vm.lista[j].dia.getTime()
                            if (diff2==0){
                                //reconver shit
                                op.canje[x].total= op.canje[x].total*0.01
                                op.canje[x].cargo= op.canje[x].cargo*0.01
                                vm.lista[j].cuenta=op.canje[x].count
                                vm.lista[j].canjen=op.canje[x].total.toLocaleString('de-DE')
                                vm.lista[j].gain = op.canje[x].cargo.toLocaleString('de-DE')
                                vm.lista[j].canjeb=op.canje[x].total + op.canje[x].cargo
                                vm.lista[j].canjeb=vm.lista[j].canjeb.toLocaleString('de-DE')
                                top=top+op.canje[x].count
                                tgain=tgain+op.canje[x].cargo
                                tcanjen=tcanjen +op.canje[x].total
                            }
                        }
                    }
                    //Totalizo las cantidades
                    vm.lista[diff].cuenta=top.toLocaleString('de-DE')
                    vm.lista[diff].canjeb=(tcanjen+tgain).toLocaleString('de-DE')
                    vm.lista[diff].canjen=tcanjen.toLocaleString('de-DE')
                    vm.lista[diff].gain=tgain.toLocaleString('de-DE')
                }
                console.log(vm.lista)
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
        .controller('canjeoListCtrl', promoListCtrl);

})());
