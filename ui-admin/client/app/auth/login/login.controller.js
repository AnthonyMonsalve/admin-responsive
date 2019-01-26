((function () {

    'use strict';

    /*@ngInject*/
    function LoginCtrl(Auth, common, $scope, localStorageService) {
        var vm = this;
        var $window = common.$window;
        var $state = common.$state;
        var storage = localStorageService;
        var currentUser = {};

        vm.user = {};
        vm.errors = {};
        $scope.keep_open = false;
        vm.submitted = false;
        vm.error = undefined;

        function login(form) {

            vm.submitted = true;
            vm.user= {user: vm.user.username, pass:vm.user.password};

            if (form.$valid) {
                Auth.login(vm.user,vm)
            } else {
                vm.submitted = false;
            }
        }

        vm.login = login;

    }

    angular.module('hiraApp.auth.login')
        .controller('LoginCtrl', LoginCtrl);
})());
