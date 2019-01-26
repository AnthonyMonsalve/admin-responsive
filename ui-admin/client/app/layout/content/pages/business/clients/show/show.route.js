((function() {
    'use strict';

    function getStates() {
        return [{
            name: 'content.business.clients.show',
            config: {
                url: '?:clientId',
                views: {
                    '@content.business.clients': {
                        templateUrl: 'app/layout/content/pages/business/clients/show/show.html',
                        controller: 'BusinessClientsShowCtrl',
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
