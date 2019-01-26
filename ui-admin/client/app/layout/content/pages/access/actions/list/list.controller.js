((function () {

    'use strict';

    /*@ngInject*/
    function AccessActionsListCtrl(common) {
        var vm = this;

        var $stateParams = common.$stateParams;

        vm.actionId = $stateParams.actionId;

        /*PRIVATE FUNCTIONS*/
        function activate() {
        }

        /*DEFINITION OF VARIABLES*/
        activate();
    }

    angular.module('hiraApp.layout.content.pages.access')
        .controller('AccessActionsListCtrl', AccessActionsListCtrl);

})());