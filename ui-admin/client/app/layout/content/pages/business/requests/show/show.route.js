((function() {
    'use strict';

    function getStates() {
        return [{
            name: 'content.business.requests.show',
            config: {
                url: '?:requestId',
                views: {
                    '@content.business.requests': {
                        templateUrl: 'app/layout/content/pages/business/requests/show/show.html',
                        controller: 'BusinessRequestsShowCtrl',
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
