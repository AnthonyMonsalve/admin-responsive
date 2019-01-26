((function() {

    'use strict';

    /*@ngInject*/
    function ClientDetailsActivateCtrl(common, ClientDetailsSvc, SweetAlert, ClientsDetailsCluster, ClientsSvc, UsersSvc, NotificationsSvc, $q) {
        var vm = this;
        var forceRemote = true;
        var findDiff = common.findDiff;

        vm.client2 = {};
        vm.client2.partner = {}
        vm.client2.partner.img = "/images/establecimientos/generico.jpg"
        vm.client2.socio = false
        function getClient(forceRemote, clientId) {
            return ClientDetailsSvc.getClient(true, clientId).then(function(client2) {
                vm.client2 = client2.data;

                if (vm.client2.type=='Promo'){
                    vm.client2.promo = true
                }else{vm.client2.promo = false}

                if (!vm.client2.hasOwnProperty('access')){
                    vm.client2.access = true
                }else {vm.client2.access = false}

                if (vm.client2.hasOwnProperty('partner')){
                    vm.client2.socio = true
                }else {vm.client2.socio = false}
                console.log(vm.client2);
            });
        }

        vm.toggleSocio =(user)=>{
            console.log(vm.client2.socio)
            if (!vm.client2.socio){
                ClientDetailsSvc.deleteSocio({user:user})
            }
        } 

        vm.mandaSocio = (user)=>{
            var group="otros"
            var des = "Otros"
            switch (vm.client2.partner.gprior) {
                case 1:
                    group = "Universidades"
                    des = "Colegios y Universidades"
                    break;
                case 2:
                    group = "Restaurantes"
                    des = "Restaurantes"
                    break;
                case 3:
                    group = "Estacionamientos"
                    des = "Estacionamientos"
                    break;
                case 4:
                    group = "Otros"
                    des = "Clubes Privados"
                    break;
            
                default:
                    group = "otros"
                    des = "Clubes Privados"
                    break;
            }
            ClientDetailsSvc.setSocio({
                user:user,
                prior: vm.client2.partner.prior,
                gprior: vm.client2.partner.gprior,
                name: vm.client2.partner.name,
                location: vm.client2.partner.location,
                img: vm.client2.partner.img,
                group: group,
                desc: des
            }).then((res)=>{
                SweetAlert.swal({
                    title: "Registrado y Publicado",
                    text: "Excelente trabajo, ¡Sigamos Buscando Socios!",
                    type: "success",
                    confirmButtonColor: "#f44336",
                    confirmButtonText: "PLOMO",
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

        vm.toggleAccess= (data)=>{
            ClientDetailsSvc.setAccess(data).then((res)=>{
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

        function toggleUserPromo(value){
            console.log('Cuenta promocional? '+value)
            const data = {'user':vm.client2.username,'promo':value}
            UsersSvc.setPromo(data).then((res)=>{
                    console.log(res)
                    SweetAlert.swal({
                        title: "Habilitación/Deshabilitación",
                        text: "Promocion",
                        type: "success",
                        confirmButtonColor: "#f44336",
                        confirmButtonText: "Cerrar",
                        closeOnConfirm: true
                    })
                }).catch(function(err) {
                    console.log(err)
                    SweetAlert.swal({
                        title: "Habilitación/Deshabilitación",
                        text: "Ha habido un error",
                        type: "error",
                        confirmButtonColor: "#f44336",
                        confirmButtonText: "Comfirmar",
                        closeOnConfirm: true
                    })
                })


        }

        function toggleUserCreditAble(value) {
            console.log('Habilitar Creditos'+value)
            var data = { 'user': vm.client2._id, 'able':value};
                UsersSvc.setAble(data).then(function(res) {
                    console.log(res);
                    SweetAlert.swal({
                        title: "Habilitación/Deshabilitación",
                        text: "Ha sido exitosa",
                        type: "success",
                        confirmButtonColor: "#f44336",
                        confirmButtonText: "Cerrar",
                        closeOnConfirm: true
                    });
                }).catch(function(err) {
                    console.log(err);
                    SweetAlert.swal({
                        title: "Habilitación/Deshabilitación",
                        text: "Ha habido un error",
                        type: "error",
                        confirmButtonColor: "#f44336",
                        confirmButtonText: "Comfirmar",
                        closeOnConfirm: true
                    });
                });
            }
        vm.toggleUserCreditAble= toggleUserCreditAble;

        function toggleUserBlocked(value) {
            console.log('bloquear'+value)
            var data = { 'username': vm.client2.username, 'blocked':value};
                UsersSvc.blockUser(data).then(function(res) {
                    console.log(res);
                    SweetAlert.swal({
                        title: "Activación/Desactivación",
                        text: "Ha sido exitosa",
                        type: "success",
                        confirmButtonColor: "#f44336",
                        confirmButtonText: "Cerrar",
                        closeOnConfirm: true
                    });
                }).catch(function(err) {
                    console.log(err);
                    SweetAlert.swal({
                        title: "Activacion/Desactivación",
                        text: "Ha habido un error",
                        type: "error",
                        confirmButtonColor: "#f44336",
                        confirmButtonText: "Comfirmar",
                        closeOnConfirm: true
                    });
                });
            }
        vm.toggleUserBlocked= toggleUserBlocked;

        function toggleUserActivation(value) {
            var data = { 'userId': vm.client2.user._id };
            if (value === true) {
                UsersSvc.activateUser(data).then(function(res) {
                    console.log(res);
                    SweetAlert.swal({
                        title: "Activacion",
                        text: "Ha sido exitosa",
                        type: "success",
                        confirmButtonColor: "#f44336",
                        confirmButtonText: "Cerrar",
                        closeOnConfirm: true
                    });
                }).catch(function(err) {
                    console.log(err);
                    SweetAlert.swal({
                        title: "Activacion",
                        text: "Ha habido un error",
                        type: "error",
                        confirmButtonColor: "#f44336",
                        confirmButtonText: "Comfirmar",
                        closeOnConfirm: true
                    });
                });
                console.log("Activacion");
            } else
            if (value === false) {
                UsersSvc.deactivateUser(data).then(function(res) {
                    console.log(res);
                    SweetAlert.swal({
                        title: "Desactivacion",
                        text: "Ha sido exitosa",
                        type: "success",
                        confirmButtonColor: "#f44336",
                        confirmButtonText: "Cerrar",
                        closeOnConfirm: true
                    });
                }).catch(function(err) {
                    console.log(err);
                    SweetAlert.swal({
                        title: "Desactivacion",
                        text: "Ha habido un error",
                        type: "error",
                        confirmButtonColor: "#f44336",
                        confirmButtonText: "Comfirmar",
                        closeOnConfirm: true
                    });

                });
                console.log("Desactivacion");
            }
        }

        vm.toggleUserActivation = toggleUserActivation;

        // console.log('vm.client.user._id: ',vm.client.user._id);


        function toggleFilterActivation(value) {
            var data = { 'personId': vm.client2._id };
            if (value === true || null) {
                UsersSvc.activateFilter(data).then(function(res) {
                    console.log(res);
                    SweetAlert.swal({
                        title: "Activacion de DataExpo",
                        text: "Ha sido exitosa",
                        type: "success",
                        confirmButtonColor: "#f44336",
                        confirmButtonText: "Cerrar",
                        closeOnConfirm: true
                    });
                }).catch(function(err) {
                    console.log(err);
                    SweetAlert.swal({
                        title: "Activacion de DataExpo",
                        text: "Ha habido un error",
                        type: "error",
                        confirmButtonColor: "#f44336",
                        confirmButtonText: "Comfirmar",
                        closeOnConfirm: true
                    });
                });
                console.log("Activacion de DataExpo");
            } else
            if (value === false) {
                UsersSvc.deactivateFilter(data).then(function(res) {
                    console.log(res);
                    SweetAlert.swal({
                        title: "Desactivacion de DataExpo",
                        text: "Ha sido exitosa",
                        type: "success",
                        confirmButtonColor: "#f44336",
                        confirmButtonText: "Cerrar",
                        closeOnConfirm: true
                    });
                }).catch(function(err) {
                    console.log(err);
                    SweetAlert.swal({
                        title: "Desactivacion de DataExpo",
                        text: "Ha habido un error",
                        type: "error",
                        confirmButtonColor: "#f44336",
                        confirmButtonText: "Comfirmar",
                        closeOnConfirm: true
                    });

                });
                console.log("Desactivacion de DataExpo");
            }
        }

        vm.toggleFilterActivation = toggleFilterActivation;

        vm.$onInit = function() {
          console.log(vm.clientId);
            getClient(true, vm.clientId)
            console.log(vm.client2.blocked)
            vm.toggleUserBlocked= toggleUserBlocked
            vm.toggleUserActivation = toggleUserActivation
            vm.toggleUserCreditAble = toggleUserCreditAble
            vm.toggleUserPromo =toggleUserPromo
            vm.toggleFilterActivation = toggleFilterActivation;
            
        };

    }

    angular.module('hiraApp')
        .controller('ClientDetailsActivateCtrl', ClientDetailsActivateCtrl);

})());
