((function() {
    'use strict';

    function getStates() {
        return [{
            name: 'content.business.clients.send_email',
            config: {
                url: '/send_email',
                views: {
                    '@content.business.clients': {
                        templateUrl: 'app/layout/content/pages/business/clients/send_email/send_email.html',
                        controller: 'BusinessClientsSendEmailCtrl',
                        controllerAs: 'vm'
                    }
                },
                title: 'Cliente'
            }
        }];
    }

    /* @ngInject */
    function stateConfig(statehelper) {
        statehelper.configureStates(getStates());
    }

    angular
        .module('hiraApp.layout.content.pages.business')
        .run(stateConfig);

})());