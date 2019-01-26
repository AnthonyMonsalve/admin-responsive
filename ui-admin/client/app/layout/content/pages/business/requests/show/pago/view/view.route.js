((function() {
    'use strict';

    function getStates() {
        return [{
            name: 'content.business.requests.show.pago.view',
            config: {
                url: '/view',
                views: {
                    '@content.business.requests.show.pago': {
                        templateUrl: 'app/layout/content/pages/business/requests/show/pago/view/view.html',
                        controller: 'BusinessRequestsPagoViewCtrl',
                        controllerAs: 'vm'
                    }
                },
                title: 'Solicitud'
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