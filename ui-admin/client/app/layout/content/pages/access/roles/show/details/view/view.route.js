((function() {
    'use strict';

    function getStates() {
        return [{
            name: 'content.access.roles.show.details.view',
            config: {
                url: '/view',
                views: {
                    '@content.access.roles.show.details': {
                        templateUrl: 'app/layout/content/pages/access/roles/show/details/view/view.html',
                        controller: 'AccessRolesDetailsViewCtrl',
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
