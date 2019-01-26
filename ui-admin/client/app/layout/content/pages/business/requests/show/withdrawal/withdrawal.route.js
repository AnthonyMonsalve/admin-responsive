((function() {
    'use strict';

    function getStates() {
        return [{
            name: 'content.business.requests.show.withdrawal',
            config: {
                url: '/withdrawal',
                views: {
                    '@content.business.requests.show': {
                        templateUrl: 'app/layout/content/pages/business/requests/show/withdrawal/withdrawal.html',
                        controller: angular.noop,
                        controllerAs: 'vm'
                    }
                },
                title: 'Retiro de efectivo'
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
