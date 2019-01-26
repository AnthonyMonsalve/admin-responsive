((function() {
    'use strict';

    function getStates() {
        return [{
            name: 'content.business.histore',
            config: {
                url: 'historial-solicitudes',
                params:{
                        clientId: null
                    },
                views: {
                    '@content.business': {
                        templateUrl: 'app/layout/content/pages/business/histore/histore.html',
                        controller: 'HistoReCtrl',
                        controllerAs: 'vm'
                    }
                },
                title: 'Historial de Solicitudes'
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
