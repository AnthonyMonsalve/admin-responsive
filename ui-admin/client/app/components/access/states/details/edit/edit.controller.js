((function () {

    'use strict';

    /*@ngInject*/
    function StateDetailsEditCtrl(common,StatesSvc,StateDetailsSvc,SweetAlert,NotificationsSvc) {
        var vm = this;

        var findDiff = common.findDiff;

        vm.validationErrors = [];
        vm.serverError = "";

        vm.state = {};
        vm.edit = {};

        function getState(forceRemote,stateId) {
            return StateDetailsSvc.getState(forceRemote,stateId).then(function(state){
                vm.state = state;
                reset();
            });
        }

        vm.$onInit = function() {
            getState(false,vm.stateId);
        };

        /*PRIVATE FUNCTIONS*/
        function reset() {
            vm.edit = angular.copy(vm.state.data);
        }

        function updateState(form,state,edit){
            if (form.$valid) {
                var changes = findDiff(state,edit);

                if (Object.keys(changes).length == 0) {
                    NotificationsSvc.fast("No changes detected","warning");
                    return;
                }

                var oldState = angular.copy(vm.state.data);

                StatesSvc.updateState(vm.resourceId,state._id,changes,oldState)
                    .then(function() {
                        NotificationsSvc.fast("Changes saved","success");
                        form.$setPristine();
                        vm.validationErrors = [];
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
        vm.updateState = updateState;

    }

    angular.module('hiraApp')
        .controller('StateDetailsEditCtrl', StateDetailsEditCtrl);

})());
