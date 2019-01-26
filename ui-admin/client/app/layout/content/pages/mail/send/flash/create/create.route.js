((function() {
    'use strict';

    function getStates() {
        return [{
            name: 'content.mail.send.flash.create',
            config: {
                url: '/create',
                views: {
                    '@content.mail.send.flash': {
                        templateUrl: 'app/layout/content/pages/mail/send/flash/create/create.html',
                        controller: 'MailSendFlashCreateCtrl',
                        controllerAs: 'vm'
                    }
                },
                title: 'Create'
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
