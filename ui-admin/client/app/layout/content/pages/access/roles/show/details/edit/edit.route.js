((function() {
    'use strict';

    function getStates() {
        return [{
            name: 'content.access.roles.show.details.edit',
            config: {
                url: '/edit',
                views: {
                    '@content.access.roles.show.details': {
                        templateUrl: 'app/layout/content/pages/access/roles/show/details/edit/edit.html',
                        controller: 'AccessRolesDetailsEditCtrl',
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
