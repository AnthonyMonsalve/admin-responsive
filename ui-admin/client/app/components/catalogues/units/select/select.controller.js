((function () {

    'use strict';

    /*@ngInject*/
    function UnitsSelectCtrl(UnitsSelectSvc) {
        var vm = this;

        function getUnits(forceRemote) {
            return UnitsSelectSvc.getUnits(forceRemote).then(function(units){
                vm.units = units;
            });
        }

        /*PRIVATE FUNCTIONS*/
        function activate() {
            getUnits(false);
        }

        activate();
    }

    angular.module('hiraApp')
        .controller('UnitsSelectCtrl', UnitsSelectCtrl);

})());
