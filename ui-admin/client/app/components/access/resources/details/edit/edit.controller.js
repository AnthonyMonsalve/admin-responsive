((function () {

    'use strict';

    /*@ngInject*/
    function ResourceDetailsEditCtrl(common,ResourcesSvc,ResourceDetailsSvc,NotificationsSvc) {
        var vm = this;

        var findDiff = common.findDiff;

        vm.validationErrors = [];
        vm.serverError = "";

        vm.resource = {};
        vm.edit = {};

        function getResource(forceRemote,resourceId) {
            return ResourceDetailsSvc.getResource(forceRemote,resourceId).then(function(resource){
                vm.resource = resource;
                reset();
            });
        }

        vm.$onInit = function() {
            getResource(false,vm.resourceId);
        };

        /*PRIVATE FUNCTIONS*/
        function reset() {
            vm.edit = angular.copy(vm.resource.data);
        }

        function updateResource(form,resourceId){
            if (form.$valid) {
                var changes = findDiff(vm.resource.data,vm.edit);

                if (Object.keys(changes).length == 0) {
                    NotificationsSvc.fast("No changes detected","warning");
                    return;
                }

                ResourcesSvc.updateResource(resourceId,changes)
                    .then(function(){
                        form.$setPristine();
                        vm.validationErrors = [];
                        NotificationsSvc.fast("Changes saved","success");
                    })
                    .catch(function(err){
                        console.log(err);
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
        vm.updateResource = updateResource;

    }

    angular.module('hiraApp')
        .controller('ResourceDetailsEditCtrl', ResourceDetailsEditCtrl);

})());