((function() {
    'use strict';

    function getStates() {
        return [{
            name: 'content.access.roles.show.permissions',
            config: {
                url: '/permissions',
                views: {
                    '@content.access.roles.show': {
                        templateUrl: 'app/layout/content/pages/access/roles/show/permissions/permissions.html',
                        controller: 'AccessRolesShowPermissionsCtrl',
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
