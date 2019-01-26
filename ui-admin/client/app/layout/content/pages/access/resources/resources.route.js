((function() {
    'use strict';

    function getStates() {
        return [{
            name: 'content.access.resources',
            config: {
                url: '/resources',
                views: {
                    '@content.access': {
                        templateUrl: 'app/layout/content/pages/access/resources/resources.html',
                        controller: 'AccessResourcesCtrl',
                        controllerAs: 'vm'
                    }
                },
                title: 'Resources'
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
