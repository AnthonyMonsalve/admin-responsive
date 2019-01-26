((function () {

    'use strict';

    /*@ngInject*/
    function ActionDetailsViewCtrl(ActionDetailsSvc) {
        var vm = this;

        vm.action = {};
        vm.selected = [];

        function getAction(forceRemote,resourceId,actionId) {
            return ActionDetailsSvc.getAction(forceRemote,resourceId,actionId).then(function(action){
                console.log(action);
                //console.log(vm.actionId);
                vm.action = action;
            });
        }

        vm.$onInit = function() {
            getAction(false,vm.resourceId,vm.actionId);
        };
    }

    angular.module('hiraApp')
        .controller('ActionDetailsViewCtrl', ActionDetailsViewCtrl);

})());
