((function () {

    'use strict';

    function getStates() {
        return [
            {
                name: 'content',
                config: {
                    data: {
                        isLoggedIn: true
                    },
                    views: {
                        '' : {
                            templateUrl: 'app/layout/content/content.html'
                        },
                        'page@content' : {
                            templateUrl: 'app/layout/content/pages/pages.html'
                        },
                        'navbar@content' : {
                            controller: 'NavbarCtrl',
                            controllerAs: 'vm',
                            templateUrl: 'app/layout/content/navbar/navbar.html'
                        },
                        'footer@content' : {
                            controller: 'FooterCtrl',
                            controllerAs: 'vm',
                            templateUrl: 'app/layout/content/footer/footer.html'
                        }
                    }
                }
            }
        ];
    }

    /* @ngInject */
    function stateConfig(statehelper) {
        statehelper.configureStates(getStates());
    }

    angular
        .module('hiraApp.layout.content')
        .run(stateConfig);

})());