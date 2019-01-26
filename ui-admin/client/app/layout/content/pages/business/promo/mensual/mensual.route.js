((function() {
    'use strict';

    function getStates() {
        return [{
            name: 'content.business.promo.mensual',
            config: {
                url: '/mensual',
                views: {
                    '@content.business.promo': {
                        templateUrl: 'app/layout/content/pages/business/promo/mensual/mensual.html',
                        controller: angular.noop,
                        controllerAs: 'vm'
                    }
                },
                title: 'Control Mensual de Pagos'
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