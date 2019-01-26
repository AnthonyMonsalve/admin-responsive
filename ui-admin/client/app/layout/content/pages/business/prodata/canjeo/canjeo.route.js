((function() {
    'use strict';

    function getStates() {
        return [{
            name: 'content.business.prodata.canjeo',
            config: {
                url: '/canjeos',
                views: {
                    '@content.business.prodata': {
                        templateUrl: 'app/layout/content/pages/business/prodata/canjeo/canjeo.html',
                        controller: angular.noop,
                        controllerAs: 'vm'
                    }
                },
                title: 'Canjeos Data'
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
