((function() {
    'use strict';

    function getStates() {
        return [{
            name: 'content.business',
            config: {
                url: '/',
                views: {
                    '@content': {
                        templateUrl: 'app/layout/content/pages/business/business.html',
                        controller: 'BusinessCtrl',
                        controllerAs: 'vm'
                    },
                    'navbar@content.business' : {
                        controller: 'BusinessNavbarCtrl',
                        controllerAs: 'vm',
                        templateUrl: 'app/layout/content/pages/business/navbar/navbar.html'
                    }
                },
                title: 'Business'
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
