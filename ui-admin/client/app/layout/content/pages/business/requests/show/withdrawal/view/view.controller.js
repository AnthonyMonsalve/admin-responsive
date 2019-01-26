((function () {

    'use strict';

    /*@ngInject*/
    function BusinessWithdrawalViewCtrl(common) {
        var vm = this;

        var $stateParams = common.$stateParams;

        vm.requestId = $stateParams.requestId;

        /*PRIVATE FUNCTIONS*/
        function activate() {
            console.log(vm.requestId);
        }

        /*DEFINITION OF VARIABLES*/
        activate();
    }

    angular.module('hiraApp.layout.content.pages.business')
        .controller('BusinessWithdrawalViewCtrl', BusinessWithdrawalViewCtrl);

})());