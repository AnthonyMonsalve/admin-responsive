((function() {

    'use strict';

    /*@ngInject*/
    function fastListCtrl(fastSvc,fastListSvc, SweetAlert, NotificationsSvc) {
        var vm = this;
        vm.selected = [];
        vm.today = new Date();
        vm.filter = fastListSvc.getFilter();
        vm.query = vm.filter.query;
        vm.dataLoaded = false;

        function getClients() {
            vm.clients = [];
            vm.dataLoaded = false;
            return fastSvc.getFast().then(function(clients) {
                vm.clients = clients;
                vm.dataLoaded = true;
                console.log(vm.clients)
            });
        }

        /*PRIVATE FUNCTIONS*/
        vm.$onInit = function() {
            getClients();
        };

        function removeClientsBatch(client_ids) {
            SweetAlert.swal({
                    title: "¿Estas seguro?",
                    text: "Esta Operación no se puede deshacer.",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#f44336",
                    confirmButtonText: "Eliminar",
                    closeOnConfirm: true
                },
                function(resp) {
                    if (resp) {
                        fastSvc.removeClientsBatch(client_ids).then(function() {
                            getClients();
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
            getClients();
        }

        vm.removeClientsBatch = removeClientsBatch;
        vm.sortBy = sortBy;
        vm.getClients = getClients;
    }

    angular.module('hiraApp')
        .controller('fastListCtrl', fastListCtrl);

})());