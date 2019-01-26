((function() {
    'use strict';

    function getStates() {
        return [{
            name: 'content.access.states',
            config: {
                url: '/states',
                views: {
                    '@content.access': {
                        templateUrl: 'app/layout/content/pages/access/states/states.html',
                        controller: 'AccessStatesCtrl',
                        controllerAs: 'vm'
                    }
                },
                title: 'States'
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
