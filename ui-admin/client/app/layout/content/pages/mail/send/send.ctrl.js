((function() {

    'use strict';

    /*@ngInject*/
    function MailSendCtrl(common) {
        var vm = this;

        vm.$state = common.$state;

        /*PRIVATE FUNCTIONS*/
        function activate() {
        }

        /*DEFINITION OF VARIABLES*/

        activate();

    }

    angular.module('hiraApp.layout.content.pages.mail')
        .controller('MailSendCtrl', MailSendCtrl);

})());
