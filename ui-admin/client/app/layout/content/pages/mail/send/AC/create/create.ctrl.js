((function () {

    'use strict';

    /*@ngInject*/
    function MailSendACCreateCtrl(common) {
        var vm = this;

        /*PRIVATE FUNCTIONS*/
        function activate() {
            vm.type = common.$stateParams.type;
            console.log(vm.type);
        }

        /*DEFINITION OF VARIABLES*/
        activate();
    }

    angular.module('hiraApp.layout.content.pages.mail')
        .controller('MailSendACCreateCtrl', MailSendACCreateCtrl);

})());