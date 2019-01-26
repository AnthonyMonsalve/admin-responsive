((function() {
    'use strict';

    function getStates() {
        return [{
            name: 'content.mail.send.ac.create',
            config: {
                url: '/create?:type',
                views: {
                    '@content.mail.send.ac': {
                        templateUrl: 'app/layout/content/pages/mail/send/AC/create/create.html',
                        controller: 'MailSendACCreateCtrl',
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
