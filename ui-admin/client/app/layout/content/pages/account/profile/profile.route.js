((function() {
    'use strict';

    function getStates() {
        return [{
            name: 'content.account.profile',
            config: {
                url: '^/profile',
                views: {
                    '@content.account': {
                        templateUrl: 'app/layout/content/pages/account/profile/profile.html',
                        controller: 'AccountProfileCtrl',
                        controllerAs: 'vm'
                    }
                },
                title: 'About you'
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
