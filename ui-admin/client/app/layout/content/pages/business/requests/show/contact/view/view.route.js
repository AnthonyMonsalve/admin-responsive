((function() {
    'use strict';

    function getStates() {
        return [{
            name: 'content.business.requests.show.contact.view',
            config: {
                url: '/view',
                views: {
                    '@content.business.requests.show.contact': {
                        templateUrl: 'app/layout/content/pages/business/requests/show/contact/view/view.html',
                        controller: 'BusinessRequestsShowViewCtrl',
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
