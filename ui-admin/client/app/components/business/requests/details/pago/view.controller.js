((function () {

    'use strict';

    /*@ngInject*/
    function RequestPagoViewCtrl(common,RequestDetailsSvc,RequestDetailsCluster,RequestsSvc, NotificationsSvc) {
        var vm = this;

        vm.request = {};
        vm.cluster = RequestDetailsCluster.getCluster();

        function getRequest(forceRemote,requestId) {
            return RequestDetailsSvc.getRequest(forceRemote,requestId).then(function(request){
                vm.request = request.data[0];
                //reconver modification to show the rigth amount
                vm.request.amount = vm.request.amount*0.01
                
                vm.fecha = request.data.recharge_date;
                console.log(vm.request);
            });
        }

        vm.$onInit = function() {
            getRequest(true,vm.requestId);
        };

        function approveRequest(request) {
            //reconver modification to send the amount
            request.amount *=100
            RequestsSvc.handlerRecharge(request,true,true).then(function(res){
                NotificationsSvc.fast("Solicitud archivada","success");
                common.$state.go("content.business.requests.list");
            }).catch(function(err){
                console.log(err);
            }); 
        }

        vm.approveRequest = approveRequest 

        function rejectRequest(request) {
            //reconver modification to send the amount
            request.amount *=100
            RequestsSvc.handlerRecharge(request,false,true).then(function(res){
                NotificationsSvc.fast("Solicitud rechazada","error");
                common.$state.go("content.business.requests.list");
            }).catch(function(err){
                console.log(err);
            }); 
        }

        vm.rejectRequest = rejectRequest           
    }

    angular.module('hiraApp')
        .controller('RequestPagoViewCtrl', RequestPagoViewCtrl);

})());