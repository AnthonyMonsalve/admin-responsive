((function() {
    'use strict';

    function getStates() {
        return [{
            name: 'content.business.promo',
            config: {
                url: 'Control-Promociones',
                views: {
                    '@content.business': {
                        templateUrl: 'app/layout/content/pages/business/promo/promo.html',
                        controller: 'PromoCtrl',
                        controllerAs: 'vm'
                    }
                },
                title: 'Promociones'
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