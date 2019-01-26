((function () {

    'use strict';

    /*@ngInject*/
    function FilterLimitCtrl() {
        var vm = this;

        vm.$onInit = function() {
            vm.quantities = [10,50,100,150];
            vm.limit = vm.filter.query.limit ? vm.filter.query.limit : "";
        };

        function limitSize(size) {
            vm.getList();
            vm.filter.limitSize(size);
        }

        vm.limitSize = limitSize;
    }

    angular.module('hiraApp')
        .controller('FilterLimitCtrl', FilterLimitCtrl);

})());
