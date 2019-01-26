((function() {
    'use strict';

    function getStates() {
        return [{
            name: 'content.contact_us',
            config: {
                url: '/contactanos',
                views: {
                    '@content': {
                        templateUrl: 'app/layout/content/pages/contact_us/contact_us.html',
                        controller: 'ContactUsCtrl',
                        controllerAs: 'vm'
                    }
                },
                title: 'Contact Us'
            }
        }];
    }

    /* @ngInject */
    function stateConfig(statehelper) {
        statehelper.configureStates(getStates());
    }

    angular
        .module('hiraApp.layout.content.pages.contact_us')
        .run(stateConfig);

})());
