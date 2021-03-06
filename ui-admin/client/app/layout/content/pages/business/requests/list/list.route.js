((function() {
    'use strict';

    function getStates() {
        return [{
            name: 'content.business.requests.list',
            config: {
                url: '/list',
                views: {
                    '@content.business.requests': {
                        templateUrl: 'app/layout/content/pages/business/requests/list/list.html',
                        controller: angular.noop,
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
