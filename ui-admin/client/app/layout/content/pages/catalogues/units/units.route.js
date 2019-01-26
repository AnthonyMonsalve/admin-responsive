((function() {
    'use strict';

    function getStates() {
        return [{
            name: 'content.catalogues.units',
            config: {
                url: '/units',
                views: {
                    '@content.catalogues': {
                        templateUrl: 'app/layout/content/pages/catalogues/units/units.html',
                        controller: 'CataloguesUnitsCtrl',
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
