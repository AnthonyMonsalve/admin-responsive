((function () {

    'use strict';

    /*@ngInject*/
    function FilterStatusCtrl() {
        var vm = this;

        vm.$onInit = function() {
            vm.status = vm.filter.query.status ? vm.filter.query.status : "";
            vm.statuses = [
                {
                    title: 'Todos',
                    name: 'none'
                },
                {
                    title: "Borrador",
                    name: "draft"
                },
                {
                    title: "Esperando",
                    name: "waiting"
                },
                {
                    title: "Enviado",
                    name: "sent"
                },
                {
                    title: "Aprobado",
                    name: "approved"
                },
                {
                    title: "Rechazado",
                    name: "cancelled"
                }
            ];
        };

        function filterStatus(status) {
            vm.filter.filterStatus(status);
            vm.getList();
        }

        vm.filterStatus = filterStatus;
    }

    angular.module('hiraApp')
        .controller('FilterStatusCtrl', FilterStatusCtrl);

})());
