((function() {
    'use strict';

    function getStates() {
        return [{
            name: 'content.access.users.show.details.edit',
            config: {
                url: '/edit',
                views: {
                    '@content.access.users.show.details': {
                        templateUrl: 'app/layout/content/pages/access/users/show/details/edit/edit.html',
                        controller: 'AccessUsersDetailsEditCtrl',
                        controllerAs: 'vm'
                    }
                },
                title: 'Edit details'
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
