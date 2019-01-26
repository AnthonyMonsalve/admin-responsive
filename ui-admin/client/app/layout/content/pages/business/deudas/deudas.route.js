((function() {
    'use strict';

    function getStates() {
        return [{
            name: 'content.business.deudas',
            config: {
                url: 'Usuarios_Deudosos',
                params:{
                        clientId: null
                    },
                views: {
                    '@content.business': {
                        templateUrl: 'app/layout/content/pages/business/deudas/deudas.html',
                        controller: 'DeudasCtrl',
                        controllerAs: 'vm'
                    }
                },
                title: 'Usuarios Deudosos'
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