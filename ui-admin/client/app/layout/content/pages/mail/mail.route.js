((function() {
    'use strict';

    function getStates() {
        return [{
            name: 'content.mail',
            config: {
                url: '/mail',
                views: {
                    '@content': {
                        templateUrl: 'app/layout/content/pages/mail/mail.html',
                        controller: 'MailCtrl',
                        controllerAs: 'vm'
                    },
                    'navbar@content.mail' : {
                        controller: 'MailNavbarCtrl',
                        controllerAs: 'vm',
                        templateUrl: 'app/layout/content/pages/mail/navbar/navbar.html'
                    }
                },
                title: 'Mail'
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
