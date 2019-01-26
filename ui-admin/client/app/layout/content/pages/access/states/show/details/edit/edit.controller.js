((function () {

    'use strict';

    /*@ngInject*/
    function AccessStatesDetailsEditCtrl(common) {
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
        .controller('AccessStatesDetailsEditCtrl', AccessStatesDetailsEditCtrl);

})());