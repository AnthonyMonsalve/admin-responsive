((function () {

    'use strict';

    /*@ngInject*/
    function BusinessRequestsDetailsViewCtrl(common) {
        var vm = this;

        var $stateParams = common.$stateParams;

        vm.requestId = $stateParams.requestId;

        /*PRIVATE FUNCTIONS*/
        function activate() {
        }

        /*DEFINITION OF VARIABLES*/
        activate();
    }

    angular.module('hiraApp.layout.content.pages.business')
        .controller('BusinessRequestsDetailsViewCtrl', BusinessRequestsDetailsViewCtrl);

})());