((function() {
    'use strict';

    function getStates() {
        return [{
            name: 'content.access.roles.list',
            config: {
                url: '/list',
                views: {
                    '@content.access.roles': {
                        templateUrl: 'app/layout/content/pages/access/roles/list/list.html',
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
