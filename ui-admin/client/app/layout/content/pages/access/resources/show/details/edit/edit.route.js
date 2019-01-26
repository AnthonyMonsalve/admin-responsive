((function() {
    'use strict';

    function getStates() {
        return [{
            name: 'content.access.resources.show.details.edit',
            config: {
                url: '/edit',
                views: {
                    '@content.access.resources.show.details': {
                        templateUrl: 'app/layout/content/pages/access/resources/show/details/edit/edit.html',
                        controller: 'AccessResourcesDetailsEditCtrl',
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
