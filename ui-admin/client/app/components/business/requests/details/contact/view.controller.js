((function () {

    'use strict';

    /*@ngInject*/
    function RequestContactViewCtrl(common,RequestDetailsSvc,RequestDetailsCluster,RequestsSvc, NotificationsSvc) {
        var vm = this;

        vm.request = {};
        vm.cluster = RequestDetailsCluster.getCluster();

        function getRequest(forceRemote,requestId) {
            return RequestDetailsSvc.getRequest(forceRemote,requestId).then(function(request){
                vm.request = request.data[0];
                if (!vm.request.user){
                  vm.request.user={}
                  vm.request.user.email = vm.request.email
                }
                console.log(request);
            });
        }

        vm.$onInit = function() {
            getRequest(true,vm.requestId);
        };

        function approveRequest(request) {
            RequestsSvc.handlerContact(request,true).then(function(res){
                NotificationsSvc.fast("Solicitud archivada","success");
                common.$state.go("content.business.requests.contactList");
            }).catch(function(err){
                console.log(err);
            });
        }

        vm.approveRequest = approveRequest

    }

    angular.module('hiraApp')
        .controller('RequestContactViewCtrl', RequestContactViewCtrl);

})());
