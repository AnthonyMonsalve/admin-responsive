((function() {
    'use strict';

    function getStates() {
        return [{
            name: 'content.access',
            config: {
                url: '/access',
                views: {
                    '@content': {
                        templateUrl: 'app/layout/content/pages/access/access.html',
                        controller: 'AccessCtrl',
                        controllerAs: 'vm'
                    },
                    'navbar@content.access' : {
                        controller: 'AccessNavbarCtrl',
                        controllerAs: 'vm',
                        templateUrl: 'app/layout/content/pages/access/navbar/navbar.html'
                    }
                },
                title: 'Access'
            }
        }];
    }

    /* @ngInject */
    function stateConfig(statehelper) {
        statehelper.configureStates(getStates());
    }

    angular
        .module('hiraApp.layout.content.pages.access')
        .run(stateConfig);

})());
