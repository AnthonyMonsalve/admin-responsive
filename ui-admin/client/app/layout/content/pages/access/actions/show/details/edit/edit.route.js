((function() {
    'use strict';

    function getStates() {
        return [{
            name: 'content.access.actions.show.details.edit',
            config: {
                url: '/edit',
                views: {
                    '@content.access.actions.show.details': {
                        templateUrl: 'app/layout/content/pages/access/actions/show/details/edit/edit.html',
                        controller: 'AccessActionsDetailsEditCtrl',
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
