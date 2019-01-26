((function() {
    'use strict';

    function getStates() {
        return [{
            name: 'content.business.clients',
            config: {
                url: 'clients',
                views: {
                    '@content.business': {
                        templateUrl: 'app/layout/content/pages/business/clients/clients.html',
                        controller: 'BusinessClientsCtrl',
                        controllerAs: 'vm'
                    }
                },
                title: 'Clientes'
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
