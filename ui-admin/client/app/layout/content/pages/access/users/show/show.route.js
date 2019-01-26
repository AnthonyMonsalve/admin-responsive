((function() {
    'use strict';

    function getStates() {
        return [{
            name: 'content.access.users.show',
            config: {
                url: '?:userId',
                views: {
                    '@content.access.users': {
                        templateUrl: 'app/layout/content/pages/access/users/show/show.html',
                        controller: 'AccessUsersShowCtrl',
                        controllerAs: 'vm'
                    }
                },
                title: 'Show User'
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
