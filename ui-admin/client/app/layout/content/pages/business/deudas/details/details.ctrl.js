((function () {

    'use strict';

    /*@ngInject*/
    function BusinessClientsDetailsViewCtrl(common,$stateParams) {
        var vm = this;
        vm.clientId = $stateParams.clientId;
        console.info(vm.clientId)
        /*PRIVATE FUNCTIONS*/
        function activate() {
        }

        /*DEFINITION OF VARIABLES*/
        activate();
    }

    angular.module('hiraApp.layout.content.pages.business')
        .controller('DebDetailsCtrl', BusinessClientsDetailsViewCtrl);

})());
