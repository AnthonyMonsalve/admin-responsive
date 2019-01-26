((function () {

    'use strict';

    /*@ngInject*/
    function StateDetailsViewCtrl(StateDetailsSvc) {
        var vm = this;

        vm.state = {};
        vm.selected = [];

        function getState(forceRemote,stateId) {
            return StateDetailsSvc.getState(forceRemote,stateId).then(function(state){
                vm.state = state;
            });
        }

        vm.$onInit = function() {
            getState(false,vm.stateId);
        };
    }

    angular.module('hiraApp')
        .controller('StateDetailsViewCtrl', StateDetailsViewCtrl);

})());
