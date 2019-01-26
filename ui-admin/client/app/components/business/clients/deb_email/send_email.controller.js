((function() {

    'use strict';

    /*@ngInject*/
    function ClientSendEmailCtrl(common, ClientsSvc, NotificationsSvc) {
        var vm = this;
        console.log(vm)
        vm.loading = false;
        vm.submitted = false;
        vm.email = {};
        vm.email.isHtml = false;
        vm.$onInit = function() {};

        function submitForm(form) {
            vm.loading = true;
            vm.submitted = true;
            /* Se anda colocando esto porque a veces llega null */
            if (!vm.email.isHtml) {
                vm.email.isHtml === false;
            }
            if (form.$valid) {
                var data = vm.email;
                data.from = "contacto@yeipii.com";
                console.log(vm)

                    data.to = vm.to;
                    data.username = vm.username
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
                    })


            } else {
                vm.loading = false;
            }
        }

        vm.submitForm = submitForm;

    }



    angular.module('hiraApp')
        .controller('DebSendEmailCtrl', ClientSendEmailCtrl);

})());
