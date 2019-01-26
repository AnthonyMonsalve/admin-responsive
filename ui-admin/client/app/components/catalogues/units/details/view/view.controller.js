((function () {

    'use strict';

    /*@ngInject*/
    function UnitsDetailsViewCtrl(UnitDetailsSvc) {
        var vm = this;

        vm.unit = {};

        function getUnit(forceRemote,unitId) {
            return UnitDetailsSvc.getUnit(forceRemote,unitId).then(function(unit){
                vm.unit = unit;
            });
        }

        vm.$onInit = function() {
            getUnit(false,vm.unitId);
        };
    }

    angular.module('hiraApp')
        .controller('UnitsDetailsViewCtrl', UnitsDetailsViewCtrl);

})());