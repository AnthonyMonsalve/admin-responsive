((function() {
    'use strict';

    function getStates() {
        return [{
            name: 'content.access.states.create',
            config: {
                url: '/create',
                views: {
                    '@content.access.states': {
                        templateUrl: 'app/layout/content/pages/access/states/create/create.html',
                        controller: 'AccessStatesCreateCtrl',
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
