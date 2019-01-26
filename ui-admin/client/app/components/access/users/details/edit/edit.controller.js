((function () {

    'use strict';

    /*@ngInject*/
    function UsersDetailsEditCtrl(common,CountriesSvc,UsersSvc,UserDetailsSvc,SweetAlert,NotificationsSvc) {
        var vm = this;

        var findDiff = common.findDiff;

        vm.validationErrors = [];
        vm.serverError = "";

        vm.countries = CountriesSvc.getCountries();

        vm.user = {};
        vm.edit = {};

        function getUser(forceRemote,userId,NotificationsSvc) {
            return UserDetailsSvc.getUser(forceRemote,userId).then(function(user){
                vm.user = user;
                reset();
            });
        }

        vm.$onInit = function() {
            getUser(false,vm.userId);
        };

        /*PRIVATE FUNCTIONS*/
        function reset() {
            vm.edit = angular.copy(vm.user.data);
        }

        function updateUser(form,userId){
            if (form.$valid) {
                var changes = findDiff(vm.user.data,vm.edit);

                if (Object.keys(changes).length == 0) {
                    NotificationsSvc.fast("No changes detected","warning");
                    return;
                }

                UsersSvc.updateUser(userId,changes)
                    .then(function(){
                        NotificationsSvc.fast("Changes saved","success");
                        form.$setPristine();
                        vm.validationErrors = [];
                    })
                    .catch(function(err){
                        console.log(err);
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

        vm.reset = reset;
        vm.updateUser = updateUser;

    }

    angular.module('hiraApp')
        .controller('UsersDetailsEditCtrl', UsersDetailsEditCtrl);

})());
