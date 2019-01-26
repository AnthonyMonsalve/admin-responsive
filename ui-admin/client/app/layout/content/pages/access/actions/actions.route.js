((function() {
    'use strict';

    function getStates() {
        return [{
            name: 'content.access.actions',
            config: {
                url: '/actions',
                views: {
                    '@content.access': {
                        templateUrl: 'app/layout/content/pages/access/actions/actions.html',
                        controller: 'AccessActionsCtrl',
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
