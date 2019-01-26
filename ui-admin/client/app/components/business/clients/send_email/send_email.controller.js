((function() {

    'use strict';

    /*@ngInject*/
    function ClientSendEmailCtrl(common, ClientsSvc, NotificationsSvc,SweetAlert) {
        var vm = this;
        console.log(vm)
        vm.loading = false;
        vm.submitted = false;
        vm.email = {};
        vm.email.message="Disculpa los inconvenientes causados trabajamos en mejorar la experiencia de usuario."
        vm.email.subtitle="Esto es una prueba interna, porfavor ignora este mensaje"
        vm.email.title = "Estimado Usuario"
        function submitForm(form) {
            vm.loading = true;
            vm.submitted = true;
            if (form.$valid) {
                var data = vm.email;
                console.log(vm)

                if(vm.to[0]){
                    data.to = vm.to;
                    console.log(data);
                    ClientsSvc.sendEmail(data).then(function(res) {
                        NotificationsSvc.fast("Tu mensaje ha sido enviado", "success");
                        form.$setPristine();
                        vm.email = {};
                        vm.email.isHtml = false;
                        console.log(res);
                        vm.loading = false;
                    }).catch(function(err) {
                        vm.loading = false;
                        NotificationsSvc.fast("Ha ocurrido un error", "error");
                        console.log(err);
                    });
                }else{
                    console.log('emailBatch');
                    SweetAlert.swal({
                        title: "Un Masivo, ¿Seguro?",
                        text: "Estas apunto de enviar un correo MASIVO, ¿estas Seguro?",
                        type: "warning",
                        showCancelButton: true,
                        dangerMode:true,
                        confirmButtonColor: "#f44336",
                        confirmButtonText: "PLOMO",
                        closeOnConfirm: true
                    }, (data)=>{
                      console.log(data);
                      if (data){
                        console.log("enviando masivo");
                        ClientsSvc.sendAll(vm.email).then(function(res) {
                            NotificationsSvc.fast("Tu mensaje está siendo enviado", "success");
                            form.$setPristine();
                            vm.email = {};
                            vm.email.isHtml = false;
                            console.log(res);
                            vm.loading = false;
                        }).catch(function(err) {
                            vm.loading = false;
                            NotificationsSvc.fast("Ha ocurrido un error", "error");
                            console.log(err);
                        });
                      }else{
                          NotificationsSvc.fast("Eso estuvo cerca, ten mas cuidado la próxima", "warning");
                      }

                    })
                    vm.loading = false;

                }
            } else {
                vm.loading = false;
            }
        }

        vm.submitForm = submitForm;

    }



    angular.module('hiraApp')
        .controller('ClientSendEmailCtrl', ClientSendEmailCtrl);

})());
