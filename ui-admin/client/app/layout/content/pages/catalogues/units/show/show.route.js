((function() {
    'use strict';

    function getStates() {
        return [{
            name: 'content.catalogues.units.show',
            config: {
                url: '?:unitId',
                views: {
                    '@content.catalogues.units': {
                        templateUrl: 'app/layout/content/pages/catalogues/units/show/show.html',
                        controller: 'AccessUnitsShowCtrl',
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
