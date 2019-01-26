((function() {
    'use strict';

    function getStates() {
        return [{
            name: 'content.business.clients.show.details.view',
            config: {
                url: '/view',
                views: {
                    '@content.business.clients.show.details': {
                        templateUrl: 'app/layout/content/pages/business/clients/show/details/view/view.html',
                        controller: 'BusinessClientsDetailsViewCtrl',
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
