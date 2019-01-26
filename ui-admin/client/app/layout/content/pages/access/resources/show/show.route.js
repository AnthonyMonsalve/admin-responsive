((function() {
    'use strict';

    function getStates() {
        return [{
            name: 'content.access.resources.show',
            config: {
                url: '?:resourceId',
                views: {
                    '@content.access.resources': {
                        templateUrl: 'app/layout/content/pages/access/resources/show/show.html',
                        controller: 'AccessResourcesShowCtrl',
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
