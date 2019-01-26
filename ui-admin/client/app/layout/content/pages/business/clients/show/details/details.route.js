((function() {
    'use strict';

    function getStates() {
        return [{
            name: 'content.business.clients.show.details',
            config: {
                url: '/details',
                views: {
                    '@content.business.clients.show': {
                        templateUrl: 'app/layout/content/pages/business/clients/show/details/details.html',
                        controller: angular.noop,
                        controllerAs: 'vm'
                    }
                },
                title: 'Client'
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
