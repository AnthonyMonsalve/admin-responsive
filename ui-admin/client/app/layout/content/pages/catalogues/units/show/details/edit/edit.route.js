((function() {
    'use strict';

    function getStates() {
        return [{
            name: 'content.catalogues.units.show.details.edit',
            config: {
                url: '/edit',
                views: {
                    '@content.catalogues.units.show.details': {
                        templateUrl: 'app/layout/content/pages/catalogues/units/show/details/edit/edit.html',
                        controller: 'CataloguesUnitsDetailsEditCtrl',
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
