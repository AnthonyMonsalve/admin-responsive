((function () {

    'use strict';

    /*@ngInject*/
    function AccountSettingsCtrl(common,NotificationsSvc,CountriesSvc,Connections) {
        var vm = this;

        var findDiff = common.findDiff;

        vm.countries = CountriesSvc.getCountries();

        /*PRIVATE FUNCTIONS*/
        function activate() {
            common.$http({
                method: 'GET',
                url: Connections.getAccessServer() + '/access/users/me'
            }).then(function(res){
                vm.user = res.data;
                reset();
            });
        }

        function reset() {
            vm.edit = angular.copy(vm.user);
        }

        function removeEmptyString (obj) {
            $.each(obj, function(key, value){
                if (value === "" || value === null){
                    delete obj[key];
                }
            });
        }

        function changeUserDetails(form){
            if (form.$invalid) {
                NotificationsSvc.fast("Invalid form","warning");
                return;
            }

            var changes = findDiff(vm.user,vm.edit);
            removeEmptyString(changes);

            if (Object.keys(changes).length == 0) {
                NotificationsSvc.fast("No changes detected","warning");
                return;
            }

            common.$http({
                method: 'PUT',
                url: Connections.getAccessServer() + '/access/users/update/' + vm.user._id,
                data: changes
            }).then(function(){
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

        function changePasswordUser(form,password){
            if (form.$valid) {
                const changes = {
                    old_password: password.old,
                    new_password: password.new
                };

                common.$http({
                    method: 'PUT',
                    url: Connections.getAccessServer() + '/access/identities/change_password',
                    data: changes
                }).then(function(){
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

        /*DEFINITION OF VARIABLES*/
        activate();

        vm.changeUserDetails = changeUserDetails;
        vm.changePasswordUser = changePasswordUser;

    }

    angular.module('hiraApp')
        .controller('AccountSettingsCtrl', AccountSettingsCtrl);

})());
