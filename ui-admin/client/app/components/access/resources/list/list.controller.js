((function () {

    'use strict';

    /*@ngInject*/
    function ResourcesListCtrl(ResourcesSvc,ResourcesListSvc,SweetAlert,NotificationsSvc) {
        var vm = this;

        vm.selected = [];

        function getResources(forceRemote) {
            return ResourcesListSvc.getResources(forceRemote).then(function(resources){
                vm.resources = resources;
            });
        }

        /*PRIVATE FUNCTIONS*/
        function activate() {
            getResources(false);
        }

        activate();

        function removeResourcesBatch(resourceIds){
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
              ResourcesSvc.removeResourcesBatch(resourceIds).then(function(){
                  getResources(true);
                  vm.selected = [];
                  NotificationsSvc.fast("Successfully deleted","success");
              })
            }
          });
        }

        vm.removeResourcesBatch = removeResourcesBatch;
        vm.getResources = getResources
    }

    angular.module('hiraApp')
        .controller('ResourcesListCtrl', ResourcesListCtrl);

})());
