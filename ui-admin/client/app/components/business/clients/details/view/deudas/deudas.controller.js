((function() {

    'use strict';

    /*@ngInject*/
    function ClientDetailsViewDeudasCtrl(common, ClientsSvc,localStorageService,promoSvc,NotificationsSvc) {
        var vm = this;
        var storage = localStorageService;
        var user = storage.get('user');
/* 
        vm.cobrar= function(id){
            fastSvc.payday(id).then(function(result){
                if (result){
                    NotificationsSvc.fast('Pago registrado','success');
                }else{NotificationsSvc.fast('Ha Habido un error','error')};
            })
        } *//* 
        db.operations.find({'type':'Fast'}).pretty()
        db.operations.findOneAndUpdate({'type':'Fast','receiver':ObjectId('59bbdeb101af166f2a4b324a')},{$set:{'cobrado':false}})

        db.operations.insert({'createdAt':ISODate('2018-04-07'),'receiver':ObjectId('59bbdeb101af166f2a4b324a'), 'amount':1000, 'type':'Fast'}) */

        /* vm.recordar = function(user){
            var data = {};
            console.log(user);
            data.to = 'agustinng14@gmail.com';
            data.from = 'yeipii@yeipii.com';
            data.message = 'Pana, recuerda pagar tu deuda con nosotros. Saludos';
            data.subject = 'Recordatorio de Pago-YeiPii';
            data.isHtml = true;
            ClientsSvc.sendEmail2(data).then(
                function(ready){NotificationsSvc.fast('Hemos enviado el recordatorio exitosamente')},
                function(err){
                    NotificationsSvc.fast('Hubo un error al enviar el correo','error')
            });
        } */
        
        function getOperations() {
            vm.deudas = [];
            vm.dataLoaded = false;
            return promoSvc.getPagoByUser(vm.clientId).then(function(operaciones) {
                vm.opera = operaciones.data;
                vm.dataLoaded = true;
                console.log(vm.opera);
            });
        }

        vm.$onInit = function() {
            console.log("ENTRA Deuda");
                getOperations();
        };

    }

    angular.module('hiraApp')
        .controller('ClientDetailsViewDeudasCtrl', ClientDetailsViewDeudasCtrl);

})());