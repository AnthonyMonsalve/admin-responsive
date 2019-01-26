((function() {
    'use strict';

    function getStates() {
        return [{
            name: 'content.access.resources.show.details',
            config: {
                url: '/details',
                views: {
                    '@content.access.resources.show': {
                        templateUrl: 'app/layout/content/pages/access/resources/show/details/details.html',
                        controller: angular.noop,
                        controllerAs: 'vm'
                    }
                },
                title: 'Resource'
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
