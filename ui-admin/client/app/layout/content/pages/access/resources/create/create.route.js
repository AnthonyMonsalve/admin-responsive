((function() {
    'use strict';

    function getStates() {
        return [{
            name: 'content.access.resources.create',
            config: {
                url: '/create',
                views: {
                    '@content.access.resources': {
                        templateUrl: 'app/layout/content/pages/access/resources/create/create.html',
                        controller: 'AccessResourcesCreateCtrl',
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
