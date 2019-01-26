((function() {
    'use strict';

    function getStates() {
        return [{
            name: 'content.business.prodata.recarga',
            config: {
                url: '/recarga',
                views: {
                    '@content.business.prodata': {
                        templateUrl: 'app/layout/content/pages/business/prodata/recarga/recarga.html',
                        controller: angular.noop,
                        controllerAs: 'vm'
                    }
                },
                title: 'recarga Data'
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
