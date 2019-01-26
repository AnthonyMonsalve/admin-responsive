((function() {
    'use strict';

    function getStates() {
        return [{
            name: 'content.home',
            config: {
                url: '/home',
                views: {
                    '@content': {
                        templateUrl: 'app/layout/content/pages/home/home.html',
                        controller: 'HomeCtrl',
                        controllerAs: 'vm'
                    }
                },
                title: 'Home'
            }
        }];
    }

    /* @ngInject */
    function stateConfig(statehelper) {
        statehelper.configureStates(getStates());
    }

    angular
        .module('hiraApp.layout.content.pages.home')
        .run(stateConfig);

})());
