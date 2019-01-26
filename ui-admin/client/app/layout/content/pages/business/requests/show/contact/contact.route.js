((function() {
    'use strict';

    function getStates() {
        return [{
            name: 'content.business.requests.show.contact',
            config: {
                url: '/contact',
                views: {
                    '@content.business.requests.show': {
                        templateUrl: 'app/layout/content/pages/business/requests/show/contact/contact.html',
                        controller: angular.noop,
                        controllerAs: 'vm'
                    }
                },
                title: 'Contactos realizados'
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
