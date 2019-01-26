((function() {

    'use strict';

    /*@ngInject*/
    function ClientsListCtrl(ClientsSvc,
        ClientsListSvc,
        SweetAlert,
        NotificationsSvc) {
        var vm = this;

        vm.selected = [];
        vm.today = new Date();
        vm.filter = ClientsListSvc.getFilter();
        vm.query = vm.filter.query;
        vm.dataLoaded = false;

        function getClients(forceRemote) {
            vm.clients = [];
            vm.dataLoaded = false;
            return ClientsListSvc.getClients(forceRemote).then(function(clients) {
                vm.clients = clients;
                vm.dataLoaded = true;
                console.log(vm.clients)
            });
        }

        /*PRIVATE FUNCTIONS*/
        vm.$onInit = function() {
            getClients(true);
        };

        function removeClientsBatch(client_ids) {
            SweetAlert.swal({
                    title: "Are you sure?",
                    text: "This operation can not be undone.",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#f44336",
                    confirmButtonText: "Yes!",
                    closeOnConfirm: true
                },
                function(resp) {
                    if (resp) {
                        ClientsSvc.removeClientsBatch(client_ids).then(function() {
                            getClients(true);
                            vm.selected = [];
                            NotificationsSvc.fast("Successfully deleted", "success");
                        });
                    }
                });
        }

        function sortBy(attr) {
            vm.dataLoaded = true;
            console.log(vm.dataLoaded);
            vm.filter.sortBy(attr);
            getClients(true);
        }

        vm.removeClientsBatch = removeClientsBatch;
        vm.sortBy = sortBy;
        vm.getClients = getClients;
    }

    angular.module('hiraApp')
        .controller('ClientsListCtrl', ClientsListCtrl);

})());