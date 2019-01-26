((function() {
    'use strict';

    function getStates() {
        return [{
            name: 'content.access.actions.list',
            config: {
                url: '/list',
                views: {
                    '@content.access.actions': {
                        templateUrl: 'app/layout/content/pages/access/actions/list/list.html',
                        controller: 'AccessActionsListCtrl',
                        controllerAs: 'vm'
                    }
                },
                title: 'Actions'
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
