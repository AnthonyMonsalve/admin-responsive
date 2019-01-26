((function () {

    'use strict';

    /*@ngInject*/
    function FilterTypeCtrl() {
        var vm = this;

        vm.$onInit = function() {
            vm.type = vm.filter.query.type ? vm.filter.query.type : "";
            vm.types = [
                {
                    title: 'Todos',
                    name: 'all'
                },
                {
                    title: 'Publicos',
                    name: 'public'
                },
                {
                    title: "Míos",
                    name: "mine"
                }
            ];
        };

        function filterType(type) {
            vm.filter.filterType(type);
            vm.getList();
        }

        vm.filterType = filterType;
    }

    angular.module('hiraApp')
        .controller('FilterTypeCtrl', FilterTypeCtrl);

})());
