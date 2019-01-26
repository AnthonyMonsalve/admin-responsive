((function() {

    'use strict';

    /*@ngInject*/
    function SignupCtrl(Auth, common) {
        var vm = this;
        var $window = common.$window;
        var $state = common.$state;

        vm.user = {};

        vm.submitted = false;

        function register(form) {
            vm.submitted = true;

            if (form.$valid) {
                var user = {
                    'email': vm.user.email,
                    'password': vm.user.password
                };
                Auth.register(user)
                    .then(function(estado) {
                        vm.errors = [];

                        $state.go(estado);
                    })
                    .catch(function(err) {
                        vm.submitted = false;

                        vm.errors = err.errors;
                    });
            } else {
                vm.submitted = false;
            }
        }

        function loginOauth(provider) {
            $window.location.href = '/auth/' + provider;
        }

        vm.register = register;
        vm.loginOauth = loginOauth;
    }

    angular.module('hiraApp.auth.signup')
        .controller('SignupCtrl', SignupCtrl);

})());
