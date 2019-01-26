((function() {
    'use strict';

    function getStates() {
        return [{
            name: 'content.business.clients.show.details.edit_admin_options',
            config: {
                url: '/edit_admin_options',
                views: {
                    '@content.business.clients.show.details': {
                        templateUrl: 'app/layout/content/pages/business/clients/show/details/edit_admin_options/edit_admin_options.html',
                        controller: 'BusinessClientsDetailsEditAdminOptionsCtrl',
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