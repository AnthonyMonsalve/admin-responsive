((function() {
    'use strict';

    function getStates() {
        return [{
            name: 'content.business.requests',
            config: {
                url: 'requests',
                views: {
                    '@content.business': {
                        templateUrl: 'app/layout/content/pages/business/requests/requests.html',
                        controller: 'BusinessRequestsCtrl',
                        controllerAs: 'vm'
                    }
                },
                title: 'Solicitudes'
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
