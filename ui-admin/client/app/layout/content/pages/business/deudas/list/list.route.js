((function() {
    'use strict';

    function getStates() {
        return [{
            name: 'content.business.deudas.list',
            config: {
                url: '/list',
                views: {
                    '@content.business.deudas': {
                        templateUrl: 'app/layout/content/pages/business/deudas/list/list.html',
                        controller: angular.noop,
                        controllerAs: 'vm'
                    }
                },
                title: 'Deudosos'
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