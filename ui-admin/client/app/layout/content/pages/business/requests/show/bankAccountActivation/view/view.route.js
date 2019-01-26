((function() {
    'use strict';

    function getStates() {
        return [{
            name: 'content.business.requests.show.bankAccountActivation.view',
            config: {
                url: '/view',
                views: {
                    '@content.business.requests.show.bankAccountActivation': {
                        templateUrl: 'app/layout/content/pages/business/requests/show/bankAccountActivation/view/view.html',
                        controller: 'BusinessRequestsDetailsViewCtrl',
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
