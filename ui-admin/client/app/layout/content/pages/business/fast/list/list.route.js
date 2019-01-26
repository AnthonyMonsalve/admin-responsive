((function() {
    'use strict';

    function getStates() {
        return [{
            name: 'content.business.fast.list',
            config: {
                url: '/list',
                views: {
                    '@content.business.fast': {
                        templateUrl: 'app/layout/content/pages/business/fast/list/list.html',
                        controller: angular.noop,
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