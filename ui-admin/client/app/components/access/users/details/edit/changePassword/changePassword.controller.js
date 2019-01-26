((function () {

    'use strict';

    /*@ngInject*/
    function UsersDetailsEditChangePasswordCtrl(common,IdentitiesSvc,NotificationsSvc) {
        var vm = this;

        vm.validationErrors = [];
        vm.serverError = "";
        vm.password = {};

        function changePasswordUser(form,password){
            if (form.$valid) {
                const changes = {
                    password: password.new
                };

                IdentitiesSvc.updateIdentity(vm.userId,changes)
                    .then(function(){
                      NotificationsSvc.fast("Changes saved","success");
                        form.$setPristine();
                        vm.validationErrors = [];
                    })
                    .catch(function(err){
                        if (err.status == '400') {
                            vm.validationErrors = err.data;
                            return;
                        }

                        if (err.status == '500') {
                            vm.serverError = 'Server error!';
                            return;
                        }
                    });
            }
        }

        vm.changePasswordUser = changePasswordUser;

    }

    angular.module('hiraApp')
        .controller('UsersDetailsEditChangePasswordCtrl', UsersDetailsEditChangePasswordCtrl);

})());
