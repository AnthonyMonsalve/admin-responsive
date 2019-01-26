((function() {
    'use strict';

    function getStates() {
        return [{
            name: 'content.mail.send',
            config: {
                url: '/send',
                views: {
                    '@content.mail': {
                        templateUrl: 'app/layout/content/pages/mail/send/send.html',
                        controller: 'MailSendCtrl',
                        controllerAs: 'vm'
                    }
                },
                title: 'Send'
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
