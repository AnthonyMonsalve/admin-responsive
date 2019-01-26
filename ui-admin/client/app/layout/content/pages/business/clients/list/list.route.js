((function() {
    'use strict';

    function getStates() {
        return [{
            name: 'content.business.clients.list',
            config: {
                url: '/list',
                views: {
                    '@content.business.clients': {
                        templateUrl: 'app/layout/content/pages/business/clients/list/list.html',
                        controller: angular.noop,
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
