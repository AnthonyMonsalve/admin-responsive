((function() {
    'use strict';

    function getStates() {
        return [{
            name: 'content.access.actions.show.details',
            config: {
                url: '/details',
                views: {
                    '@content.access.actions.show': {
                        templateUrl: 'app/layout/content/pages/access/actions/show/details/details.html',
                        controller: angular.noop,
                        controllerAs: 'vm'
                    }
                },
                title: 'Role'
            }
        }];
    }

    /* @ngInject */
    function stateConfig(statehelper) {
        statehelper.configureStates(getStates());
    }

    angular
        .module('hiraApp.layout.content.pages.access')
        .run(stateConfig);

})());
