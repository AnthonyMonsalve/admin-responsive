((function () {

    'use strict';

    /*@ngInject*/
    function ActionDetailsEditCtrl(common,ActionsSvc,ActionDetailsSvc,SweetAlert,NotificationsSvc) {
        var vm = this;

        var findDiff = common.findDiff;

        vm.validationErrors = [];
        vm.serverError = "";

        vm.action = {};
        vm.edit = {};

        function getAction(forceRemote,resourceId,actionId) {
            return ActionDetailsSvc.getAction(forceRemote,resourceId,actionId).then(function(action){
                vm.action = action;
                reset();
            });
        }

        vm.$onInit = function() {
            getAction(false,vm.resourceId,vm.actionId);
        };

        /*PRIVATE FUNCTIONS*/
        function reset() {
            vm.edit = angular.copy(vm.action.data);
        }

        function updateAction(form,action,edit){
            if (form.$valid) {
                var changes = findDiff(action,edit);

                console.log(vm.resourceId);
                console.log(vm.edit);

                if (Object.keys(changes).length == 0) {
                    NotificationsSvc.fast("No changes detected","warning");
                    return;
                }

                var oldAction = angular.copy(vm.action.data);

                ActionsSvc.updateAction(vm.resourceId,action._id,changes,oldAction)
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
        vm.updateAction = updateAction;

    }

    angular.module('hiraApp')
        .controller('ActionDetailsEditCtrl', ActionDetailsEditCtrl);

})());
