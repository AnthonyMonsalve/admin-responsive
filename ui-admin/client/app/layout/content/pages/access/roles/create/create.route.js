((function() {
    'use strict';

    function getStates() {
        return [{
            name: 'content.access.roles.create',
            config: {
                url: '/create',
                views: {
                    '@content.access.roles': {
                        templateUrl: 'app/layout/content/pages/access/roles/create/create.html',
                        controller: 'AccessRolesCreateCtrl',
                        controllerAs: 'vm'
                    }
                },
                title: 'Role'
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
