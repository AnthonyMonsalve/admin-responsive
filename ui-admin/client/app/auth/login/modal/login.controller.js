/**
 *   Created by daniel on 2/15/17 --
 **/

((function () {

    'use strict';

    /*@ngInject*/
    function LoginModalCtrl(Auth,common,$mdDialog,NotificationsSvc) {
        var vm = this;

        vm.submitted = false;
        vm.currentUser = Auth.getCurrentUser();

        function authenticate(form,password) {
            if (form.$invalid) {
                NotificationsSvc.fast("Invalid form","warning");
            }

            vm.submitted = true;

            Auth.authenticate(password)
                .then(function(){
                	$mdDialog.hide();
                })
                .catch(function(err){
                    vm.submitted = false
                    if (err.status == '400') {
                        vm.validationErrors = err.data;
                        NotificationsSvc.fast("Invalid form data","warning");
                        return;
                    }

                    if (err.status == '500') {
                        vm.serverError = 'Error login.';
                        NotificationsSvc.fast("Server error","error");
                        return;
                    }
                });
        }

        vm.authenticate = authenticate;
    }


    angular.module('hiraApp.auth.login')
        .controller('LoginModalCtrl', LoginModalCtrl);

})());
