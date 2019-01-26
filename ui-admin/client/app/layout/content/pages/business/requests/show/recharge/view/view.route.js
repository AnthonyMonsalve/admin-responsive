((function() {
    'use strict';

    function getStates() {
        return [{
            name: 'content.business.requests.show.recharge.view',
            config: {
                url: '/view',
                views: {
                    '@content.business.requests.show.recharge': {
                        templateUrl: 'app/layout/content/pages/business/requests/show/recharge/view/view.html',
                        controller: 'BusinessRequestsRechargeViewCtrl',
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
