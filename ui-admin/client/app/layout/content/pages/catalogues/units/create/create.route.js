((function() {
    'use strict';

    function getStates() {
        return [{
            name: 'content.catalogues.units.create',
            config: {
                url: '/create',
                views: {
                    '@content.catalogues.units': {
                        templateUrl: 'app/layout/content/pages/catalogues/units/create/create.html',
                        controller: 'CataloguesUnitsCreateCtrl',
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
