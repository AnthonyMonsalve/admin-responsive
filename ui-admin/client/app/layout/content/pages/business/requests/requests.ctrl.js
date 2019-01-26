((function() {

    'use strict';

    /*@ngInject*/
    function BusinessRequestsCtrl(common) {
        var vm = this;

        vm.$state = common.$state;

        /*PRIVATE FUNCTIONS*/
        function activate() {
        }

        /*DEFINITION OF VARIABLES*/

        activate();

    }

    angular.module('hiraApp.layout.content.pages.business')
        .controller('BusinessRequestsCtrl', BusinessRequestsCtrl);

})());
