((function () {

    'use strict';

    /*@ngInject*/
    function ResourceDetailsPreviewCtrl(ResourceDetailsSvc) {
        var vm = this;

        vm.selected = [];

        vm.resource = {};

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
        .controller('ResourceDetailsPreviewCtrl', ResourceDetailsPreviewCtrl);

})());
