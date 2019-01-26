((function () {

    'use strict';

    /*@ngInject*/
    function MailSendFlashContactCtrl(common) {
        var vm = this;
        
        vm.contactList = common.$state.params.contactList;

        /*PRIVATE FUNCTIONS*/
        function activate() {
        }

        /*DEFINITION OF VARIABLES*/
        activate();
    }

    angular.module('hiraApp.layout.content.pages.mail')
        .controller('MailSendFlashContactCtrl', MailSendFlashContactCtrl);

})());