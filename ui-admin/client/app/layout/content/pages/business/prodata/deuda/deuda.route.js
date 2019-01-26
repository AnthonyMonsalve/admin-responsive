((function() {
    'use strict';

    function getStates() {
        return [{
            name: 'content.business.prodata.deuda',
            config: {
                url: '/Deudas',
                views: {
                    '@content.business.prodata': {
                        templateUrl: 'app/layout/content/pages/business/prodata/deuda/deuda.html',
                        controller: angular.noop,
                        controllerAs: 'vm'
                    }
                },
                title: 'Deudas Data'
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
