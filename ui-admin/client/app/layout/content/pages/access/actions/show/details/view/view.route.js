((function() {
    'use strict';

    function getStates() {
        return [{
            name: 'content.access.actions.show.details.view',
            config: {
                url: '/view',
                views: {
                    '@content.access.actions.show.details': {
                        templateUrl: 'app/layout/content/pages/access/actions/show/details/view/view.html',
                        controller: 'AccessActionsDetailsViewCtrl',
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
