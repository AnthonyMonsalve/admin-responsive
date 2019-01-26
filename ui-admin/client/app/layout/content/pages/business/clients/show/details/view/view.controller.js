((function () {

    'use strict';

    /*@ngInject*/
    function BusinessClientsDetailsViewCtrl(common) {
        var vm = this;

        var $stateParams = common.$stateParams;

        vm.clientId = $stateParams.clientId;

        /*PRIVATE FUNCTIONS*/
        function activate() {
        }

        /*DEFINITION OF VARIABLES*/
        activate();
    }

    angular.module('hiraApp.layout.content.pages.business')
        .controller('BusinessClientsDetailsViewCtrl', BusinessClientsDetailsViewCtrl);

})());