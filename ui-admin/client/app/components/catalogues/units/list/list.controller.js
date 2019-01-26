((function () {

    'use strict';

    /*@ngInject*/
    function UnitsListCtrl(UnitsSvc, SweetAlert, UnitsListSvc, NotificationsSvc) {
        var vm = this;

        vm.selected = [];

        function getUnits(forceRemote) {
            return UnitsListSvc.getUnits(forceRemote).then(function(units){
                vm.units = units;
            });
        }

        /*PRIVATE FUNCTIONS*/
        function activate() {
            getUnits(false);
        }

        activate();

        function removeUnitsBatch(unitIds){
            SweetAlert.swal({
                    title: "Are you sure?",
                    text: "This operation can not be undone.",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#f44336",
                    confirmButtonText: "Yes!",
                    closeOnConfirm: true
                },
                function(resp){
                    if (resp) {
                        UnitsSvc.removeUnitsBatch(unitIds).then(function(){
                            getUnits(true);
                            vm.selected = [];
                            NotificationsSvc.fast("Successfully deleted","success");
                        })
                    }
                });
        }

        vm.removeUnitsBatch = removeUnitsBatch;
        vm.getUnits = getUnits
    }

    angular.module('hiraApp')
        .controller('UnitsListCtrl', UnitsListCtrl);

})());
