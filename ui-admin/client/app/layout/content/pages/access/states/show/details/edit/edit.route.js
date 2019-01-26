((function() {
    'use strict';

    function getStates() {
        return [{
            name: 'content.access.states.show.details.edit',
            config: {
                url: '/edit',
                views: {
                    '@content.access.states.show.details': {
                        templateUrl: 'app/layout/content/pages/access/states/show/details/edit/edit.html',
                        controller: 'AccessStatesDetailsEditCtrl',
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
