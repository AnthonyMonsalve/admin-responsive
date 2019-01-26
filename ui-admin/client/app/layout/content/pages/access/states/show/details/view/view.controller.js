((function () {

    'use strict';

    /*@ngInject*/
    function AccessStatesDetailsViewCtrl(common) {
        var vm = this;

        var $stateParams = common.$stateParams;

        vm.stateId = $stateParams.stateId;

        /*PRIVATE FUNCTIONS*/
        function activate() {
        }

        /*DEFINITION OF VARIABLES*/
        activate();
    }

    angular.module('hiraApp.layout.content.pages.access')
        .controller('AccessStatesDetailsViewCtrl', AccessStatesDetailsViewCtrl);

})());