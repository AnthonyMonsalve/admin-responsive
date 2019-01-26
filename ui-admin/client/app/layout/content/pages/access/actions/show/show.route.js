((function() {
    'use strict';

    function getStates() {
        return [{
            name: 'content.access.actions.show',
            config: {
                abstract: true,
                url: '?:actionId?:resourceId',
                views: {
                    '@content.access.actions': {
                        templateUrl: 'app/layout/content/pages/access/actions/show/show.html',
                        controller: 'AccessActionsShowCtrl',
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
