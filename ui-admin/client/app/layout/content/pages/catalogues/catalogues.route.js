((function() {
    'use strict';

    function getStates() {
        return [{
            name: 'content.catalogues',
            config: {
                url: '/catalogues',
                views: {
                    '@content': {
                        templateUrl: 'app/layout/content/pages/catalogues/catalogues.html',
                        controller: 'CataloguesCtrl',
                        controllerAs: 'vm'
                    },
                    'navbar@content.catalogues' : {
                        controller: 'CataloguesNavbarCtrl',
                        controllerAs: 'vm',
                        templateUrl: 'app/layout/content/pages/catalogues/navbar/navbar.html'
                    }
                },
                title: 'Catalogues'
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
