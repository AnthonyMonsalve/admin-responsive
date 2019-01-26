((function() {

    'use strict';

    /*@ngInject*/
    function promoListCtrl(prodataSvc,deudaListSvc, SweetAlert, NotificationsSvc) {
        var vm = this;
        vm.selected = [];
        vm.today = new Date();
        vm.filter = deudaListSvc.getFilter();
        vm.query = vm.filter.query;
        vm.dataLoaded = false;
        let fecha = new Date()
        vm.hasta = fecha
        vm.desde = new Date(fecha.getFullYear(),fecha.getMonth()-1,fecha.getDate())


        function getClients(p=0) {
            vm.lista=[]
            vm.head = []
            vm.deuda = false

            //Obtiene la data de los usuarios
            prodataSvc.userStats().then(function(data){
                console.log(data)
                vm.reUsers=data.data.total
                vm.activeUsers=data.data.clienteActivas
                vm.nactiveUsers = data.data.clienteNoActivas
                vm.promoUsers = data.data.promo
                vm.emUsers=data.data.employee
            })
            //diferencia entre desde y hasta
            let diff = Math.ceil(Math.abs(vm.hasta.getTime()-vm.desde.getTime())/(1000*3600*24))

            //Genera la lista de fechas a mostrar
            for (let i = 0; i <diff; i++) {
                var dat = new Date(vm.desde.getFullYear(),vm.desde.getMonth(),vm.desde.getDate()+i+p,vm.desde.getHours()-4,0,0,0)
                var dat2 =new Date(vm.desde.getFullYear(),vm.desde.getMonth(),vm.desde.getDate()+i+p,vm.desde.getHours()+1,0,0,0)
                vm.lista[i]={'dia':dat,'total':0,'dia_s':dat2}
            }
            vm.lista[diff]={'dia':'Total/Promedios','dia_s':'Total/Promedios'}

            //console.log(vm.lista)
            //vm.head establece las cabeceras
            vm.head=[
                {'name':'Fecha','data':vm.lista},
                {'name':'Operaciones_Deuda'},
                {'name':'Delta Deuda'},
                {'name':'Operaciones_Pago'},
                {'name':'Delta Pago'},
                {'name':'Deuda Total'}
            ]

            //Cargando data del server
            vm.dataLoaded = false;

            return prodataSvc.operaData(new Date(1971,5,5),vm.hasta,['pago']).then((opera0)=>{
                if (opera0.data.pago){
                    var topP=0
                    var tdeltaP=0
                    let pagos=opera0.data.pago
                    for (let j=0; j < diff; j++){
                        vm.lista[j].cuentaP=0
                        vm.lista[j].deltaP=0
                        for (let x=0;x<pagos.length;x++){
                            let diff3= pagos[x].fecha.getTime()-vm.lista[j].dia.getTime()
                                if (diff3==0){
                                    //reconver Shit
                                    pagos[x].total = pagos[x].total*0.01
                                    vm.lista[j].cuentaP=pagos[x].count
                                    vm.lista[j].deltaP=pagos[x].total.toLocaleString('de-DE')
                                    topP+=pagos[x].count
                                    tdeltaP+=pagos[x].total
                                }
                        }
                    }

                    prodataSvc.operaData(new Date(1971,5,5),vm.hasta,['deuda','pago']).then(function(opera){
                        //console.info(opera)
                        var op = opera.data
                        //before reconver ajuste=27114034
                        var ajuste = 271.14;
                        
                        //totales
                        var top=0
                        var tdelta=0
                        var tdeuda=0
                        //Si recibo la data que quiero establecida en ['deuda']
                        if (op.deuda){
                            vm.deuda=true
                            console.log(op.deuda)
                            console.log(pagos)
                            let deudas = 0
                            let extra= false
                            //A partir de aqui organizo la data que quiero mostrar, la data del server la organizo con la lista para ser mostrada
                            //este ciclo recorre la lista setiando los valores a 0 para luego con el otro ciclo modificar solo con la data que tengo
                            for (let j=0; j < diff; j++){
                                vm.lista[j].cuenta=0
                                vm.lista[j].delta=0
                                vm.lista[j].deuda=0
                                var acumulaDebt = 0
                                var acumulaPago=0
                                var A=0,B=0
                                //Este ciclo recorre la data recibida del servidor en busca de la data correspondiente a cada fecha
                                for (let x=0;x<op.deuda.length;x++){
                                    //console.log(x+' '+B)
                                    //El fume loco para mantener el acumulado en los dias adecuados
                                    let dif0=0
                                    if (B>pagos.length){B--;dif0=-1}
                                    else{dif0= op.deuda[x].fecha.getTime()-pagos[B].fecha.getTime()}

                                    if (dif0==0){
                                        //reconverShit 
                                        op.deuda[x].total*=0.01
                                        pagos[B].total*=0.01

                                        acumulaDebt+=op.deuda[x].total
                                        acumulaPago+=pagos[B].total
                                        if (B< pagos.length) {B++}

                                    } else if (dif0>0){
                                        //reconverShit
                                        pagos[B].total*=0.01

                                        acumulaPago+=pagos[B].total
                                        x--
                                        if (B< pagos.length ) {B++}
                                    } else if (dif0<0){
                                        //reconverShit
                                        op.deuda[x].total*=0.01

                                        acumulaDebt+=op.deuda[x].total
                                    }
                                    //resta la fecha de la lista con la obtenida del servidor hace el match y guarda la data que me importa.
                                    let diff2= op.deuda[x].fecha.getTime()-vm.lista[j].dia.getTime()
                                    if (diff2==0){
                                        vm.lista[j].deuda = (acumulaDebt-acumulaPago+ajuste).toLocaleString('de-DE')
                                        vm.lista[j].cuenta=op.deuda[x].count
                                        vm.lista[j].delta=op.deuda[x].total.toLocaleString('de-DE')
                                        top+=op.deuda[x].count
                                        tdelta+=op.deuda[x].total
                                        tdeuda+=acumulaDebt-acumulaPago+ajuste
                                        console.log('salte sesamo1')
                                        break

                                    }
                                    //Tengo q hacer lo mismo con los pagos.
                                    //if (B<pagos.length+1){
                                        let diff3= pagos[B-1].fecha.getTime()-vm.lista[j].dia.getTime()
                                        if (diff3==0){
                                            vm.lista[j].deuda = (acumulaDebt-acumulaPago+ajuste).toLocaleString('de-DE')
                                            tdeuda+=acumulaDebt-acumulaPago+ajuste
                                            console.log('salte sesamo2')
                                            break
                                        }
                                    //}
                                    if (B>=pagos.length){
                                        break
                                    }
                                }
                            }

                            //Totalizo las cantidades
                            vm.lista[diff].cuenta=top.toLocaleString('de-DE')
                            vm.lista[diff].delta=Math.ceil(tdelta/diff).toLocaleString('de-DE')
                            vm.lista[diff].deuda =Math.ceil(tdeuda/diff).toLocaleString('de-DE')
                            vm.lista[diff].cuentaP=topP.toLocaleString('de-DE')
                            vm.lista[diff].deltaP=Math.ceil(tdeltaP/diff).toLocaleString('de-DE')

                        }

                        console.log(vm.lista)
                        vm.dataLoaded = true
                    })
                }
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
        .controller('deudaCtrl', promoListCtrl);

})());
