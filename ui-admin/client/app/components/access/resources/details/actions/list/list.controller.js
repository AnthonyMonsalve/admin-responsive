((function () {

    'use strict';

    /*@ngInject*/
    function ResourceDetailsActionsListCtrl(ActionsSvc,ResourceDetailsActionsListSvc) {
        var vm = this;

        vm.selected = [];

        function getResourceActionsList(forceRemote,resourceId) {
            return ResourceDetailsActionsListSvc.getResourceActionsList(forceRemote,resourceId).then(function(res){
                console.log(res);
                vm.resourceActions = res;
            });
        }

        /*PRIVATE FUNCTIONS*/
        function activate() {
        }

        vm.$onInit = function(){
            getResourceActionsList(false,vm.resourceId);
        };

        /*DEFINITION OF VARIABLES*/
        activate();

        function deleteResourceAction(resourceId,actionId) {
            if (confirm('Seguro?')) {
                ActionsSvc.deleteAction(resourceId,actionId);
            }
        }

        vm.getResourceActionsList = getResourceActionsList;
        vm.deleteResourceAction = deleteResourceAction;
    }

    angular.module('hiraApp')
        .controller('ResourceDetailsActionsListCtrl', ResourceDetailsActionsListCtrl);

})());
