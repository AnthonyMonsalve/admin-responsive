((function() {
    'use strict';

    function getStates() {
        return [{
            name: 'content.mail.send.flash',
            config: {
                url: '/flash-mercado',
                views: {
                    '@content.mail.send': {
                        templateUrl: 'app/layout/content/pages/mail/send/flash/flash.html',
                        controller: 'MailSendFlashCtrl',
                        controllerAs: 'vm'
                    }
                },
                title: 'Apertura y Cierre'
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
