((function() {
    'use strict';

    function getStates() {
        return [{
            name: 'content.access.roles.show.permissions.states',
            config: {
                url: '/states',
                views: {
                    '@content.access.roles.show.permissions': {
                        templateUrl: 'app/layout/content/pages/access/roles/show/permissions/states/states.html',
                        controller: 'AccessRolesShowPermissionsStatesCtrl',
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
