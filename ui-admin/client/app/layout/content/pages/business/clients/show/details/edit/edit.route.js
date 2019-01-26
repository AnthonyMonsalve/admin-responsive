((function() {
    'use strict';

    function getStates() {
        return [{
            name: 'content.business.clients.show.details.edit',
            config: {
                url: '/edit',
                views: {
                    '@content.business.clients.show.details': {
                        templateUrl: 'app/layout/content/pages/business/clients/show/details/edit/edit.html',
                        controller: 'BusinessClientsDetailsEditCtrl',
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