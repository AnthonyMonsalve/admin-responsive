((function () {

    'use strict';

    /*@ngInject*/
    function FilterPaginationCtrl() {
        var vm = this;

        vm.$onInit = function() {
            vm.paging = vm.filter.paging;
        };

        function getPage(side) {
            vm.filter.getPage(side);
            vm.getList();
        }

        function getRight(side) {
            if (vm.paging.current === vm.paging.total)
                return;
            else
                getPage(side);
        }

        function getLeft(side) {
            if (vm.paging.current === 1)
                return;
            else
                getPage(side);
        }

        vm.getRight = getRight;
        vm.getLeft = getLeft;
    }

    angular.module('hiraApp')
        .controller('FilterPaginationCtrl', FilterPaginationCtrl);

})());
