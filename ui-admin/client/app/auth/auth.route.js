((function () {

    'use strict';

    function getStates() {
        return [
            {
                name: 'login',
                config: {
                    url: '/login',
                    title: 'Login',
                    templateUrl: 'app/auth/login/login.html',
                    controller: 'LoginCtrl'
                }
            },
            {
                name: 'signup',
                config: {
                    url: '/signup',
                    templateUrl: 'app/auth/signup/signup.html',
                    controller: 'SignupCtrl'
                }
            },
            {
                name: 'settings',
                config: {
                    url: '/settings',
                    templateUrl: 'app/auth/settings/settings.html',
                    controller: 'SettingsCtrl',
                    data: {
                        authenticate: true
                    }
                }
            },          
            {
                name: 'logout',
                config: {
                    url: '/logout',
                    controller: /*@ngInject*/ function(common,Auth){
                        Auth.logout();
                        common.$state.go('site.home');
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
        .module('hiraApp.auth')
        .run(stateConfig);

})());
