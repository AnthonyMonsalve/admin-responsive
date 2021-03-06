((function () {

    'use strict';

    /*@ngInject*/
    function AccessActionsDetailsEditCtrl(common) {
        var vm = this;

        var $stateParams = common.$stateParams;

        vm.actionId = $stateParams.actionId;
        vm.resourceId = $stateParams.resourceId;

        /*PRIVATE FUNCTIONS*/
        function activate() {
        }

        /*DEFINITION OF VARIABLES*/
        activate();
    }

    angular.module('hiraApp.layout.content.pages.access')
        .controller('AccessActionsDetailsEditCtrl', AccessActionsDetailsEditCtrl);

})());