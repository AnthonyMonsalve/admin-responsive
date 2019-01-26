((function() {
    'use strict';

    function getStates() {
        return [{
            name: 'content.business.requests.show.withdrawal.view',
            config: {
                url: '/view',
                views: {
                    '@content.business.requests.show.withdrawal': {
                        templateUrl: 'app/layout/content/pages/business/requests/show/withdrawal/view/view.html',
                        controller: 'BusinessWithdrawalViewCtrl',
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
