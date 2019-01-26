((function() {
    'use strict';

    function getStates() {
        return [{
            name: 'content.access.resources.show.details.view',
            config: {
                url: '/view',
                views: {
                    '@content.access.resources.show.details': {
                        templateUrl: 'app/layout/content/pages/access/resources/show/details/view/view.html',
                        controller: 'AccessResourcesDetailsViewCtrl',
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
