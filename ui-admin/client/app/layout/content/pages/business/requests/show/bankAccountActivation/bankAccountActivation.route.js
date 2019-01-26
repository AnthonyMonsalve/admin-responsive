((function() {
    'use strict';

    function getStates() {
        return [{
            name: 'content.business.requests.show.bankAccountActivation',
            config: {
                url: '/bankAccountActivation',
                views: {
                    '@content.business.requests.show': {
                        templateUrl: 'app/layout/content/pages/business/requests/show/bankAccountActivation/bankAccountActivation.html',
                        controller: angular.noop,
                        controllerAs: 'vm'
                    }
                },
                title: 'Activacion de cuenta bancaria'
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
