((function() {
    'use strict';

    function getStates() {
        return [{
            name: 'content.access.roles.show',
            config: {
                url: '?:roleId',
                views: {
                    '@content.access.roles': {
                        templateUrl: 'app/layout/content/pages/access/roles/show/show.html',
                        controller: 'AccessRolesShowCtrl',
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
