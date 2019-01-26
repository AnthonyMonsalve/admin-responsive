((function() {

    'use strict';

    /*@ngInject*/
    function ClientDetailsActivateCtrl(common, Connections, ClientDetailsSvc, SweetAlert, ClientsDetailsCluster, ClientsSvc, UsersSvc, NotificationsSvc, $q) {
        var vm = this;
        vm.sons = [];
        var $http = common.$http;
       
        var baseUrl_business = Connections.getBusinessServer();
        vm.createSon= (form)=>{
            if(form.$valid){
                const pass = Math.random().toString(36).slice(-8);
                let data = {
                    mom: vm.mom,
                    user: vm.son,
                    simple: vm.simple,
                    mail: vm.mail,
                    description:vm.des,
                    password: pass,
                    recarga:vm.recarga,
                    transfiere:vm.transfiere,
                    canjea:vm.canjea,
                    historialson: vm.historialSon,
                    historialmom: vm.historialMom,
                    balance:vm.balance
                }
                console.log(data)
                ClientDetailsSvc.createSon(data).then(()=>{
                    vm.sons.push({
                        user:{
                            username:vm.son,
                            simple:vm.simple,
                            createdAt: new Date()
                        },roles:{
                            recarga:vm.recarga,
                            transfiere:vm.transfiere,
                            canjea:vm.canjea,
                            historialSon: vm.historialSon,
                            historialMom: vm.historialMom,
                            balance:vm.balance
                        }
                    })
                    vm.son=""
                    vm.des =""
                    vm.recarga=false
                    vm.transfiere=false
                    vm.canjea=false
                    vm.historialSon=false
                    vm.historialMom=false
                    vm.balance=false
                    vm.simple=false
                }).catch(function(err) {
                    console.log(err.data)
                    if (!!err.data.reason){
                        return SweetAlert.swal({
                            title: "Creación no posible",
                            text: err.data.reason,
                            type: "error",
                            confirmButtonColor: "#f44336",
                            confirmButtonText: "Lo siento",
                            closeOnConfirm: true
                        })
                    }
                    return SweetAlert.swal({
                        title: "Creación Imposible",
                        text: "Esto no ha pasado antes, comunicate con Tech division y reporta lo que hiciste",
                        type: "error",
                        confirmButtonColor: "#f44336",
                        confirmButtonText: "Fuck, mas trabajo para Tech",
                        closeOnConfirm: true
                    })
                })
            }
        }

        vm.deleteSon=(id)=>{
          return ClientDetailsSvc.deleteSon({_id:id}).then(()=>{vm.sons=[];getSons(vm.mom)})
        }

        function getSons(mom) {
            return ClientDetailsSvc.getSons(mom).then(function(client) {
                vm.sons = client.data;
                console.log(vm.sons);
            }).catch((err)=>{
              console.log(err);
              if (err.data=='notfound'){
                console.log('este usuario no tiene hijos')
              }else{
                SweetAlert.swal({
                    title: "Obtener Hijos imposible",
                    text: "Esto no ha pasado antes, comunicate con Tech division y reporta lo que hiciste",
                    type: "error",
                    confirmButtonColor: "#f44336",
                    confirmButtonText: "Fuck, mas trabajo para Tech",
                    closeOnConfirm: true
                })
              }
            })
        }

        vm.toggleSimple = (data)=>{
            ClientDetailsSvc.setSimple(data).then((res)=>{
                SweetAlert.swal({
                    title: "Hemos cambiado la simpleza con éxito",
                    text: "Todo ha salido pepa. duerme tranquilo",
                    type: "success",
                    confirmButtonColor: "#f44336",
                    confirmButtonText: "ok",
                    closeOnConfirm: true
                })
            }).catch(()=>{
                SweetAlert.swal({
                    title: "algo malo ha ocurrido",
                    text: "Verifica tu conexion a internet y tu consola a ver q ha pasado.",
                    type: "error",
                    confirmButtonColor: "#f44336",
                    confirmButtonText: "Fuck, mas trabajo para Tech",
                    closeOnConfirm: true
                })
            })
        }

        vm.togglePermitions= (data)=>{
            ClientDetailsSvc.setRoles(data).then((res)=>{
              SweetAlert.swal({
                  title: "Hemos cambiado los Roles con éxito",
                  text: "Todo ha salido pepa. duerme tranquilo",
                  type: "success",
                  confirmButtonColor: "#f44336",
                  confirmButtonText: "ok",
                  closeOnConfirm: true
              })
            }).catch(()=>{
              SweetAlert.swal({
                  title: "algo malo ha ocurrido",
                  text: "Verifica tu conexion a internet y tu consola a ver q ha pasado.",
                  type: "error",
                  confirmButtonColor: "#f44336",
                  confirmButtonText: "Fuck, mas trabajo para Tech",
                  closeOnConfirm: true
              })
            })
        }
        vm.$onInit = function() {
            getSons(vm.mom)
            console.log(vm.momail)
            vm.mail= vm.momail.split('@')
            vm.mail = vm.mail[0]+'+cuentahija@'+vm.mail[1]
            vm.recarga=false
            vm.transfiere=false
            vm.canjea=false
            vm.historialSon=false
            vm.historialMom=false
            vm.balance=false
            vm.simple = false
        };

    }

    angular.module('hiraApp')
        .controller('ClientDetailsSonsCtrl', ClientDetailsActivateCtrl);

})());
