((function() {
    'use strict';

    function getStates() {
        return [{
            name: 'content.access.users.create',
            config: {
                url: '/create',
                views: {
                    '@content.access.users': {
                        templateUrl: 'app/layout/content/pages/access/users/create/create.html',
                        controller: 'AccessUsersCreateCtrl',
                        controllerAs: 'vm'
                    }
                },
                title: 'Create User'
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
