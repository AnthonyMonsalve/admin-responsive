((function() {
    'use strict';

    function getStates() {
        return [{
            name: 'content.business.prodata',
            config: {
                url: 'Data_Expo',
                views: {
                    '@content.business': {
                        templateUrl: 'app/layout/content/pages/business/prodata/prodata.html',
                        controller: 'ProDataCtrl',
                        controllerAs: 'vm'
                    }
                },
                title: 'Expo Data YEiPii'
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