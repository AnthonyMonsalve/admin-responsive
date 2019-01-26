((function() {
    'use strict';

    function getStates() {
        return [{
            name: 'content.access.states.show',
            config: {
                url: '?:stateId',
                views: {
                    '@content.access.states': {
                        templateUrl: 'app/layout/content/pages/access/states/show/show.html',
                        controller: 'AccessStatesShowCtrl',
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
