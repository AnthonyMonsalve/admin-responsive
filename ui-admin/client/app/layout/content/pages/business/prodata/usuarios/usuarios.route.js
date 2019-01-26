((function() {
    'use strict';

    function getStates() {
        return [{
            name: 'content.business.prodata.usuarios',
            config: {
                url: '/usuarios',
                views: {
                    '@content.business.prodata': {
                        templateUrl: 'app/layout/content/pages/business/prodata/usuarios/usuarios.html',
                        controller: angular.noop,
                        controllerAs: 'vm'
                    }
                },
                title: 'Users Data'
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