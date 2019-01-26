((function () {

    'use strict';

    /*@ngInject*/
    function UsersCreateCtrl(common,CountriesSvc,UsersSvc,SweetAlert,NotificationsSvc) {
        var vm = this;

        var $state = common.$state;

        vm.identity = {};
        vm.validationErrors = [];
        vm.serverError = "";
        vm.password = {};
        vm.countries = CountriesSvc.getCountries();

        /*PRIVATE FUNCTIONS*/
        function activate() {
        }

        /*DEFINITION OF VARIABLES*/
        activate();

        function createUser(form,identity) {
            if (form.$valid) {
                UsersSvc.createUser(identity)
                    .then(function(res){
                       NotificationsSvc.fast("Successfully created","success",2000);
                       $state.go('content.access.users.show.details.edit',{userId:res.data._id});
                       vm.validationErrors = [];
                       vm.identity = {};
                    })
                    .catch(function(err){
                        if (err.status == '400') {
                            console.log(err.data);
                            vm.validationErrors = err.data;
                            return;
                        }

                        if (err.status == '500') {
                            vm.serverError = 'Error creating identity.';
                            return;
                        }
                    });
            } else {
                NotificationsSvc.fast("Bad data in form","error");
            }
        }

        vm.createUser = createUser;
    }

    angular.module('hiraApp')
        .controller('UsersCreateCtrl', UsersCreateCtrl);

})());
