((function () {

    'use strict';

    /*@ngInject*/
    function WithdrawalDetailsViewCtrl(common,RequestDetailsSvc,RequestDetailsCluster,RequestsSvc, NotificationsSvc) {
        var vm = this;

        vm.request = {};
        vm.cluster = RequestDetailsCluster.getCluster();

        function getRequest(forceRemote,requestId) {
            return RequestDetailsSvc.getRequest(forceRemote,requestId).then(function(request){
                vm.request = request.data[0];
                //reconver modification to show the rigth amount
                vm.request.amount = vm.request.amount*0.01
                vm.request.deposit = vm.request.amount *(100-vm.request.user.admin_options.withdraw_service_rate)/100
                console.log(request);
            });
        }

        vm.$onInit = function() {
            getRequest(true,vm.requestId);
        };

        function approveRequest(data) {
            //reconver modification to send the amount
            data.amount *=100
            RequestsSvc.handleWithdrawal(data,true).then(function(res){
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
            RequestsSvc.handleWithdrawal(request,false).then(function(res){
                NotificationsSvc.fast("Solicitud rechazada","error");
                common.$state.go("content.business.requests.list");
            }).catch(function(err){
                console.log(err);
            }); 
        }

        vm.rejectRequest = rejectRequest;
    }

    angular.module('hiraApp')
        .controller('WithdrawalDetailsViewCtrl', WithdrawalDetailsViewCtrl);

})());