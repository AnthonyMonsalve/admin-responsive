((function() {
    'use strict';

    function getStates() {
        return [{
            name: 'content.access.users.show.details',
            config: {
                url: '/details',
                views: {
                    '@content.access.users.show': {
                        templateUrl: 'app/layout/content/pages/access/users/show/details/details.html',
                        controller: angular.noop,
                        controllerAs: 'vm'
                    }
                },
                title: 'User\'s details'
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
