((function() {
    'use strict';

    function getStates() {
        return [{
            name: 'content.business.requests.show.pago',
            config: {
                url: '/pago',
                views: {
                    '@content.business.requests.show': {
                        templateUrl: 'app/layout/content/pages/business/requests/show/pago/pago.html',
                        controller: angular.noop,
                        controllerAs: 'vm'
                    }
                },
                title: 'Pago solicitado'
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