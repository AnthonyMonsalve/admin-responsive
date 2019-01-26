((function () {

    'use strict';

    /*@ngInject*/
    function HomeCtrl(common,NotificationsSvc,Connections) {
        var vm = this;

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


        vm.changePasswordUser = changePasswordUser;
    }

    angular.module('hiraApp.layout.content.pages.home')
        .controller('HomeCtrl', HomeCtrl);

})());