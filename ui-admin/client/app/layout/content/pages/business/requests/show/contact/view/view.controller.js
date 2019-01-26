((function () {

    'use strict';

    /*@ngInject*/
    function BusinessRequestsShowViewCtrl(common) {
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
        .controller('BusinessRequestsShowViewCtrl', BusinessRequestsShowViewCtrl);

})());