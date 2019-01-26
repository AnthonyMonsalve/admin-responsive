((function () {

    'use strict';

    /*@ngInject*/
    function ActionsListCtrl(common,ActionsSvc, ActionsListSvc, SweetAlert, NotificationsSvc) {
        var $state = common.$state;
        var vm = this;

        vm.$state = $state;

        vm.selected = [];

        function getActions(forceRemote) {
            return ActionsListSvc.getActions(forceRemote).then(function(actions){
                vm.actions = actions;
            });
        }

        /*PRIVATE FUNCTIONS*/
        function activate() {
            getActions(false);
        }

        activate();

        function removeActionsBatch(actionIds){
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
                ActionsSvc.removeActionsBatch(actionIds).then(function(){
                  getActions(true);
                  vm.selected = [];
                  NotificationsSvc.fast("Successfully deleted","success");
                });
              }
            });
        }

        function showInfo(id,resourceId) {
          $state.go("content.access.actions.show.details.view",{actionId:id,resourceId:resourceId});
        }

        function editInfo(id,resourceId) {
          $state.go("content.access.actions.show.details.edit",{actionId:id,resourceId:resourceId});
        }

        vm.removeActionsBatch = removeActionsBatch;
        vm.getActions = getActions
        vm.showInfo = showInfo;
        vm.editInfo = editInfo;

        /* ESTO ES TEMPORAL */

    }

    angular.module('hiraApp')
        .controller('ActionsListCtrl', ActionsListCtrl);

})());
