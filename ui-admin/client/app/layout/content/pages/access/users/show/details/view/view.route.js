((function() {
    'use strict';

    function getStates() {
        return [{
            name: 'content.access.users.show.details.view',
            config: {
                url: '/view',
                views: {
                    '@content.access.users.show.details': {
                        templateUrl: 'app/layout/content/pages/access/users/show/details/view/view.html',
                        controller: 'AccessUsersDetailsViewCtrl',
                        controllerAs: 'vm'
                    }
                },
                title: 'View details'
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
