((function () {

    'use strict';

    /*@ngInject*/
    function StatesListCtrl(common,StatesSvc, StatesListSvc, SweetAlert, NotificationsSvc) {
        var $state = common.$state;
        var vm = this;

        vm.$state = $state;
        vm.selected = [];

        function getStates(forceRemote) {
            return StatesListSvc.getStates(forceRemote).then(function(states){
                vm.states = states;
            });
        }

        /*PRIVATE FUNCTIONS*/
        function activate() {
            getStates(false);
        }

        activate();

        function removeStatesBatch(stateIds){
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
                StatesSvc.removeStatesBatch(stateIds).then(function(){
                  getStates(true);
                  vm.selected = [];
                  NotificationsSvc.fast("Successfully deleted","success");
                });
              }
            });
        }

        function showInfo(id) {
          $state.go("content.access.states.show.details.view",{stateId:id});
        }

        function editInfo(id) {
          $state.go("content.access.states.show.details.edit",{stateId:id});
        }

        vm.removeStatesBatch = removeStatesBatch;
        vm.getStates = getStates;
        vm.showInfo = showInfo;
        vm.editInfo = editInfo;

        /* ESTO ES TEMPORAL */

    }

    angular.module('hiraApp')
        .controller('StatesListCtrl', StatesListCtrl);

})());
