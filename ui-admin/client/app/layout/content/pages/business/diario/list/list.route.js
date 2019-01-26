((function() {
    'use strict';

    function getStates() {
        return [{
            name: 'content.business.diario.list',
            config: {
                url: '/lista',
                views: {
                    '@content.business.diario': {
                        templateUrl: 'app/layout/content/pages/business/diario/list/list.html',
                        controller: angular.noop,
                        controllerAs: 'vm'
                    }
                },
                title: 'Lista control diario'
            }
        }];
    }

    /* @ngInject */
    function stateConfig(statehelper) {
        statehelper.configureStates(getStates());
    }

    angular
        .module('hiraApp.layout.content.pages.business')
        .run(stateConfig);

})());