((function() {
    'use strict';

    function getStates() {
        return [{
            name: 'content.catalogues.units.list',
            config: {
                url: '/list',
                views: {
                    '@content.catalogues.units': {
                        templateUrl: 'app/layout/content/pages/catalogues/units/list/list.html',
                        controller: angular.noop,
                        controllerAs: 'vm'
                    }
                },
                title: 'Units'
            }
        }];
    }

    /* @ngInject */
    function stateConfig(statehelper) {
        statehelper.configureStates(getStates());
    }

    angular
        .module('hiraApp.layout.content.pages.catalogues')
        .run(stateConfig);

})());
