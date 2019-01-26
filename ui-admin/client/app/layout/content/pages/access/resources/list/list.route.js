((function() {
    'use strict';

    function getStates() {
        return [{
            name: 'content.access.resources.list',
            config: {
                url: '/list',
                views: {
                    '@content.access.resources': {
                        templateUrl: 'app/layout/content/pages/access/resources/list/list.html',
                        controller: angular.noop,
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
