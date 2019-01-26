((function() {
    'use strict';

    function getStates() {
        return [{
            name: 'content.access.roles.show.permissions.actions',
            config: {
                url: '/actions',
                views: {
                    '@content.access.roles.show.permissions': {
                        templateUrl: 'app/layout/content/pages/access/roles/show/permissions/actions/actions.html',
                        controller: 'AccessRolesShowPermissionsActionsCtrl',
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
