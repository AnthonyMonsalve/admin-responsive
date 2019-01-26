((function() {
    'use strict';

    function getStates() {
        return [{
            name: 'content.access.users',
            config: {
                url: '/users',
                views: {
                    '@content.access': {
                        templateUrl: 'app/layout/content/pages/access/users/users.html',
                        controller: 'AccessUsersCtrl',
                        controllerAs: 'vm'
                    }
                },
                title: 'Users'
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
