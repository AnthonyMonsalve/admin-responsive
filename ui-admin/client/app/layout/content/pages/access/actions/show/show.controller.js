((function () {

    'use strict';

    /*@ngInject*/
    function AccessActionsShowCtrl(common) {
        var vm = this;

        var $stateParams = common.$stateParams;

        vm.resourceId = $stateParams.resourceId;

        /*PRIVATE FUNCTIONS*/
        function activate() {
        }

        /*DEFINITION OF VARIABLES*/
        activate();
    }

    angular.module('hiraApp.layout.content.pages.access')
        .controller('AccessActionsShowCtrl', AccessActionsShowCtrl);

})());