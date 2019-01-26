((function() {
    'use strict';

    function getStates() {
        return [{
            name: 'content.business.prodata.transferencia',
            config: {
                url: '/transferencia',
                views: {
                    '@content.business.prodata': {
                        templateUrl: 'app/layout/content/pages/business/prodata/transferencia/transferencia.html',
                        controller: angular.noop,
                        controllerAs: 'vm'
                    }
                },
                title: 'transferencia Data'
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
