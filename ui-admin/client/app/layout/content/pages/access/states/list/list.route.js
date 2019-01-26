((function() {
    'use strict';

    function getStates() {
        return [{
            name: 'content.access.states.list',
            config: {
                url: '/list',
                views: {
                    '@content.access.states': {
                        templateUrl: 'app/layout/content/pages/access/states/list/list.html',
                        controller: angular.noop,
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
