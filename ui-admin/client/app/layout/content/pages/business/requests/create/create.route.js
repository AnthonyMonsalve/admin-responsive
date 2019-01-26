((function() {
    'use strict';

    function getStates() {
        return [{
            name: 'content.business.requests.create',
            config: {
                url: '/create',
                views: {
                    '@content.business.requests': {
                        templateUrl: 'app/layout/content/pages/business/requests/create/create.html',
                        controller: 'BusinessRequestsCreateCtrl',
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
