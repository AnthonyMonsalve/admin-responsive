((function() {
    'use strict';

    function getStates() {
        return [{
            name: 'content.business.requests.show.recharge',
            config: {
                url: '/recharge',
                views: {
                    '@content.business.requests.show': {
                        templateUrl: 'app/layout/content/pages/business/requests/show/recharge/recharge.html',
                        controller: angular.noop,
                        controllerAs: 'vm'
                    }
                },
                title: 'Recarga solicitada'
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
