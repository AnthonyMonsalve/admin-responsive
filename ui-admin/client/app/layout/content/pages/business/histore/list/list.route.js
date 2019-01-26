((function() {
    'use strict';

    function getStates() {
        return [{
            name: 'content.business.histore.list',
            config: {
                url: '/list',
                views: {
                    '@content.business.histore': {
                        templateUrl: 'app/layout/content/pages/business/histore/list/list.html',
                        controller: angular.noop,
                        controllerAs: 'vm'
                    }
                },
                title: 'Solicitudes'
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