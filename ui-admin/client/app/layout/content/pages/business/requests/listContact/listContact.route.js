((function() {
    'use strict';

    function getStates() {
        return [{
            name: 'content.business.requests.contactList',
            config: {
                url: '/listContact',
                views: {
                    '@content.business.requests': {
                        templateUrl: 'app/layout/content/pages/business/requests/listContact/listContact.html',
                        controller: angular.noop,
                        controllerAs: 'vm'
                    }
                },
                title: 'Solicitudes'
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
