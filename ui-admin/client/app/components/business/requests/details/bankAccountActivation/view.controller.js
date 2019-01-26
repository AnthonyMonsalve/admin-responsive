((function () {

    'use strict';

    /*@ngInject*/
    function RequestequestBankAccountActivationViewCtrl(common,RequestDetailsSvc,RequestDetailsCluster,RequestsSvc, NotificationsSvc) {
        var vm = this;

        vm.request = {};
        vm.cluster = RequestDetailsCluster.getCluster();

        function getRequest(forceRemote,requestId) {
            return RequestDetailsSvc.getRequest(forceRemote,requestId).then(function(request){
                vm.request = request.data[0];
                console.log(request.data[0]);
            });
        }

        vm.$onInit = function() {
            getRequest(true,vm.requestId);
        };


        function approveRequest(request) {
            RequestsSvc.handleActivation(request,true).then(function(res){
                NotificationsSvc.fast("Solicitud archivada","success");
                common.$state.go("content.business.requests.list");
                console.log(res);
            }).catch(function(err){
                console.log(err);
            });
        }

        vm.approveRequest = approveRequest

        function rejectRequest(request) {
            RequestsSvc.handleActivation(request,false).then(function(res){
                NotificationsSvc.fast("Solicitud rechazada","error");
                common.$state.go("content.business.requests.list");
                console.log(res);
            }).catch(function(err){
                console.log(err);
            });
        }

        vm.rejectRequest = rejectRequest
    }

    angular.module('hiraApp')
        .controller('RequestequestBankAccountActivationViewCtrl', RequestequestBankAccountActivationViewCtrl);

})());
