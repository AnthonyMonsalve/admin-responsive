((function () {

    'use strict';

    /*@ngInject*/
    function AccessUsersDetailsViewCtrl(common) {
        var vm = this;

        var $stateParams = common.$stateParams;

        vm.userId = $stateParams.userId;

        /*PRIVATE FUNCTIONS*/
        function activate() {
        }

        /*DEFINITION OF VARIABLES*/
        activate();
    }

    angular.module('hiraApp.layout.content.pages.access')
        .controller('AccessUsersDetailsViewCtrl', AccessUsersDetailsViewCtrl);

})());