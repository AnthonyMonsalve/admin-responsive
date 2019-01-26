((function() {
    'use strict';

    function getStates() {
        return [{
            name: 'content.business.diario',
            config: {
                url: 'Control-Diario',
                views: {
                    '@content.business': {
                        templateUrl: 'app/layout/content/pages/business/diario/diario.html',
                        controller: 'DiarioCtrl',
                        controllerAs: 'vm'
                    }
                },
                title: 'Estadísticas Diarias'
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