((function () {

    'use strict';

    /*@ngInject*/
    function UnitsCreateCtrl(common,UnitsSvc,NotificationsSvc) {
        var vm = this;

        var $state = common.$state;

        vm.unit = {};
        vm.validationErrors = [];
        vm.serverError = "";

        /*PRIVATE FUNCTIONS*/
        function activate() {
        }

        /*DEFINITION OF VARIABLES*/
        activate();

        function createUnit(form,unit) {
            if (form.$valid) {
                UnitsSvc.createUnit(unit)
                    .then(function(){
                        vm.validationErrors = [];
                        vm.unit = {};
                        NotificationsSvc.fast("Successfully created","success");
                        $state.go('content.catalogues.units.list');
                    })
                    .catch(function(err){
                        if (err.status == '400') {
                            vm.validationErrors = err.data;
                            return;
                        }

                        if (err.status == '500') {
                            vm.serverError = 'Error creating unit.';
                            return;
                        }
                    });
            } else {
              NotificationsSvc.fast("Bad data in form","error");
            }
        }

        vm.createUnit = createUnit;
    }

    angular.module('hiraApp')
        .controller('UnitsCreateCtrl', UnitsCreateCtrl);

})());