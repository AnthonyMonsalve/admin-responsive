((function () {

    'use strict';

    /*@ngInject*/
    function UnitDetailsEditCtrl(common,UnitsSvc, UnitDetailsSvc,NotificationsSvc) {
        var vm = this;

        var findDiff = common.findDiff;

        vm.validationErrors = [];
        vm.serverError = "";

        vm.unit = {};
        vm.edit = {};

        function getUnit(forceRemote,unitId) {
            return UnitDetailsSvc.getUnit(forceRemote,unitId).then(function(unit){
                vm.unit = unit;
                reset();
            });
        }

        vm.$onInit = function() {
            getUnit(false,vm.unitId);
        };

        /*PRIVATE FUNCTIONS*/
        function reset() {
            vm.edit = angular.copy(vm.unit.data);
        }

        function updateUnit(form,unitId){
            if (form.$valid) {
                var changes = findDiff(vm.unit.data,vm.edit);

                if (Object.keys(changes).length == 0) {
                    NotificationsSvc.fast("No changes detected","warning");
                    return;
                }

                UnitsSvc.updateUnit(unitId,changes)
                    .then(function(){
                        form.$setPristine();
                        vm.validationErrors = [];
                        NotificationsSvc.fast("Changes saved","success");
                    })
                    .catch(function(err){
                        if (err.status == '400') {
                            vm.validationErrors = err.data;
                            return;
                        }

                        if (err.status == '500') {
                            vm.serverError = 'Server error!';
                            return;
                        }
                    });
            }
        }

        vm.reset = reset;
        vm.updateUnit = updateUnit;

    }

    angular.module('hiraApp')
        .controller('UnitDetailsEditCtrl', UnitDetailsEditCtrl);

})());