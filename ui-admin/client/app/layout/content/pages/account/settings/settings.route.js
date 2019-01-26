((function() {
    'use strict';

    function getStates() {
        return [{
            name: 'content.account.settings',
            config: {
                url: '^/account_settings',
                views: {
                    '@content.account': {
                        templateUrl: 'app/layout/content/pages/account/settings/settings.html',
                        controller: 'AccountProfileCtrl',
                        controllerAs: 'vm'
                    }
                },
                title: 'Account Settings'
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
