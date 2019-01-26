((function() {
    'use strict';

    function getStates() {
        return [{
            name: 'content.access.states.show.details.view',
            config: {
                url: '/view',
                views: {
                    '@content.access.states.show.details': {
                        templateUrl: 'app/layout/content/pages/access/states/show/details/view/view.html',
                        controller: 'AccessStatesDetailsViewCtrl',
                        controllerAs: 'vm'
                    }
                },
                title: 'State'
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
