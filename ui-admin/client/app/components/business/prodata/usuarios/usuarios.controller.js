((function() {

    'use strict';

    /*@ngInject*/
    function promoListCtrl(prodataSvc,usuariosListSvc, SweetAlert, NotificationsSvc) {
        var vm = this;
        vm.selected = [];
        vm.today = new Date();
        vm.filter = usuariosListSvc.getFilter();
        vm.query = vm.filter.query;
        vm.dataLoaded = false;
        let fecha = new Date()
        vm.hasta = fecha
        vm.desde = new Date(fecha.getFullYear(),fecha.getMonth()-1,fecha.getDate())
        vm.margen = 30

        
        function getClients(p=0) {
            vm.lista=[]
            vm.head = []
            vm.usuarios = false
            
            //Usuarios Frecuentes
            let margen = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()-vm.margen)
        
            //diferencia entre desde y hasta
            let diff = Math.ceil(Math.abs(vm.hasta.getTime()-vm.desde.getTime())/(1000*3600*24))

            //Genera la lista de fechas a mostrar
            for (let i = 0; i <diff; i++) {
                var dat = new Date(vm.desde.getFullYear(),vm.desde.getMonth(),vm.desde.getDate()+i+p,vm.desde.getHours()-4,0,0,0)
                var dat2 =new Date(vm.desde.getFullYear(),vm.desde.getMonth(),vm.desde.getDate()+i+p,vm.desde.getHours()+1,0,0,0)
                vm.lista[i]={'dia':dat,'total':0,'dia_s':dat2}
            }
            vm.lista[diff]={'dia':'Total/Promedios','dia_s':'Total/Promedios'}

            //Cargando data del server
            vm.dataLoaded = false

            //Obtiene la data de los usuarios
            prodataSvc.userStats(vm.desde,vm.hasta, margen).then(function(data){
                console.log(data)
                vm.reUsers=data.data.total
                vm.activeUsers=data.data.clienteActivas
                vm.nactiveUsers = data.data.clienteNoActivas
                vm.promoUsers = data.data.promo
                vm.emUsers=data.data.employee
                vm.registrosDiarios = data.data.registrosDiario
                vm.freqUsers = data.data.frecuentes
                if (vm.registrosDiarios){
                    var tregistros=0
                    for (let j=0; j < diff; j++){
                        vm.lista[j].deltaR=0
                        for (let x=0;x<vm.registrosDiarios.length;x++){
                            let diff3= vm.registrosDiarios[x].fecha.getTime()-vm.lista[j].dia.getTime()
                                if (diff3==0){
                                    vm.lista[j].deltaR=vm.registrosDiarios[x].registrados
                                    tregistros+=vm.registrosDiarios[x].registrados                                    
                                }
                        }
                    }
                    vm.lista[diff].deltaR=tregistros
                }
                vm.dataLoaded=true
            })

            //console.log(vm.lista)
            //vm.head establece las cabeceras
            vm.head=[
                {'name':'Fecha','data':vm.lista},
                {'name':'Registros del día'}
            ]


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
        .controller('usuariosCtrl', promoListCtrl);

})());
