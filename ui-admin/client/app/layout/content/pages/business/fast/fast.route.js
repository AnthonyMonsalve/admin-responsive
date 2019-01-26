((function() {
    'use strict';

    function getStates() {
        return [{
            name: 'content.business.fast',
            config: {
                url: 'Recargas_inmediatas',
                views: {
                    '@content.business': {
                        templateUrl: 'app/layout/content/pages/business/fast/fast.html',
                        controller: 'FastCtrl',
                        controllerAs: 'vm'
                    }
                },
                title: 'Recargas Inmediatas'
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