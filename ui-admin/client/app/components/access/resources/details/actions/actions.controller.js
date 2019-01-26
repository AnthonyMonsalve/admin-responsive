((function () {

    'use strict';

    /*@ngInject*/
    function ResourceDetailsActionsCtrl() {
        var vm = this;
        vm.state = 'list';

        function activate(){
        }

        activate();

        function goTo(state) {
            vm.state = state;
        }

        vm.goTo = goTo;
    }

    angular.module('hiraApp')
        .controller('ResourceDetailsActionsCtrl', ResourceDetailsActionsCtrl);

})());