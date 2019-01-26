((function() {
    'use strict';

    function getStates() {
        return [{
            name: 'content.access.roles',
            config: {
                url: '/roles',
                views: {
                    '@content.access': {
                        templateUrl: 'app/layout/content/pages/access/roles/roles.html',
                        controller: 'AccessRolesCtrl',
                        controllerAs: 'vm'
                    }
                },
                title: 'Roles'
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
