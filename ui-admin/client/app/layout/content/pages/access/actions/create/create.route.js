((function() {
    'use strict';

    function getStates() {
        return [{
            name: 'content.access.actions.create',
            config: {
                url: '/create',
                views: {
                    '@content.access.actions': {
                        templateUrl: 'app/layout/content/pages/access/actions/create/create.html',
                        controller: 'AccessActionsCreateCtrl',
                        controllerAs: 'vm'
                    }
                },
                title: 'Action'
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
