((function() {
    'use strict';

    function getStates() {
        return [{
            name: 'content.account',
            config: {
                url: '/account',
                abstract: true,
                views: {
                    '@content' : {
                        controller: 'UserAccountCtrl',
                        controllerAs: 'vm',
                        templateUrl: 'app/layout/content/pages/account/account.html'
                    },
                    'navbar@content.account' : {
                        controller: 'AccountNavbarCtrl',
                        controllerAs: 'vm',
                        templateUrl: 'app/layout/content/pages/account/navbar/navbar.html'
                    }
                },
                title: 'Account'
            }
        }];
    }

    /* @ngInject */
    function stateConfig(statehelper) {
        statehelper.configureStates(getStates());
    }

    angular
        .module('hiraApp.layout.content.pages.account')
        .run(stateConfig);

})());
