((function() {
    'use strict';

    function getStates() {
        return [{
            name: 'content.catalogues.units.show.details',
            config: {
                url: '/details',
                views: {
                    '@content.catalogues.units.show': {
                        templateUrl: 'app/layout/content/pages/catalogues/units/show/details/details.html',
                        controller: angular.noop,
                        controllerAs: 'vm'
                    }
                },
                title: 'Unit'
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
