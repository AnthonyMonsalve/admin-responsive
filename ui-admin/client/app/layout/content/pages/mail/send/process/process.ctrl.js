((function () {

    'use strict';

    /*@ngInject*/
    function MailSendProcessCtrl(common,SendMailSvc) {
        var vm = this;
        var $stateParams = common.$stateParams;

        /*PRIVATE FUNCTIONS*/
        function activate() {
        }

        /*DEFINITION OF VARIABLES*/
        activate();
    }

    angular.module('hiraApp.layout.content.pages.mail')
        .controller('MailSendProcessCtrl', MailSendProcessCtrl);

})());