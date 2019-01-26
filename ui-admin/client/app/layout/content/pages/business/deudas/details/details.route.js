((function() {
    'use strict';

    function getStates() {
        return [{
            name: 'content.business.deudas.details',
            params:{
                    clientId: null
                },
            config: {
                url: '/details',
                views: {
                    '@content.business.deudas': {
                        templateUrl: 'app/layout/content/pages/business/deudas/details/details.html',
                        controller: 'DebDetailsCtrl',
                        controllerAs: 'vm'
                    }
                },
                title: 'control'
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