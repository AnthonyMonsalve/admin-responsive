((function () {

    'use strict';

    /*@ngInject*/
    function ResourcesSelectCtrl(ResourcesSelectSvc) {
        var vm = this;

        function getResources(forceRemote) {
            return ResourcesSelectSvc.getResources(forceRemote).then(function(resources){
                vm.resources = resources;
            });
        }

        /*PRIVATE FUNCTIONS*/
        function activate() {
            getResources(false);
        }

        activate();
    }

    angular.module('hiraApp')
        .controller('ResourcesSelectCtrl', ResourcesSelectCtrl);

})());