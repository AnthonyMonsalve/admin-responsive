((function() {
    'use strict';

    function getStates() {
        return [{
            name: 'content.mail.send.ac',
            config: {
                url: '/apertura-y-cierre',
                views: {
                    '@content.mail.send': {
                        templateUrl: 'app/layout/content/pages/mail/send/AC/ac.html',
                        controller: 'MailSendACCtrl',
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
