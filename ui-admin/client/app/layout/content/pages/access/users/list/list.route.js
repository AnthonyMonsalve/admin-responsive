((function() {
    'use strict';

    function getStates() {
        return [{
            name: 'content.access.users.list',
            config: {
                url: '/list',
                views: {
                    '@content.access.users': {
                        templateUrl: 'app/layout/content/pages/access/users/list/list.html',
                        controller: angular.noop,
                        controllerAs: 'vm'
                    }
                },
                title: 'List Users'
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
