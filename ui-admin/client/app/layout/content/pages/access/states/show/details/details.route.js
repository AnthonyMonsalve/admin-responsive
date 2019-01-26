((function() {
    'use strict';

    function getStates() {
        return [{
            name: 'content.access.states.show.details',
            config: {
                url: '/details',
                views: {
                    '@content.access.states.show': {
                        templateUrl: 'app/layout/content/pages/access/states/show/details/details.html',
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
