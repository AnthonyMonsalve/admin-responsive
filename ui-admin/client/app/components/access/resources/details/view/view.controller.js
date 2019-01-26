((function () {

    'use strict';

    /*@ngInject*/
    function ResourceDetailsViewCtrl(ResourceDetailsSvc,ResourceDetailsCluster) {
        var vm = this;

        vm.resource = {};
        vm.cluster = ResourceDetailsCluster.getCluster();

        function getResource(forceRemote,resourceId) {
            return ResourceDetailsSvc.getResource(forceRemote,resourceId).then(function(resource){
                vm.resource = resource;
            });
        }

        vm.$onInit = function() {
            getResource(false,vm.resourceId);
        };
    }

    angular.module('hiraApp')
        .controller('ResourceDetailsViewCtrl', ResourceDetailsViewCtrl);

})());