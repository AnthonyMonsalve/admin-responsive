((function() {
    'use strict';

    function getStates() {
        return [{
            name: 'content.mail.send.process',
            config: {
                url: '/process',
                views: {
                    '@content.mail.send': {
                        templateUrl: 'app/layout/content/pages/mail/send/process/process.html',
                        controller: 'MailSendProcessCtrl',
                        controllerAs: 'vm'
                    }
                },
                title: 'Current Process'
            }
        }];
    }

    /* @ngInject */
    function stateConfig(statehelper) {
        statehelper.configureStates(getStates());
    }

    angular
        .module('hiraApp.layout.content.pages.mail')
        .run(stateConfig);

})());
