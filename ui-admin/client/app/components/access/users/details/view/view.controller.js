((function () {

    'use strict';

    /*@ngInject*/
    function UsersDetailsViewCtrl(UserDetailsSvc) {
        var vm = this;

        vm.user = {};
        vm.selected = [];

        function getUser(forceRemote,userId) {
            return UserDetailsSvc.getUser(forceRemote,userId).then(function(user){
                vm.user = user;
            });
        }

        vm.$onInit = function() {
            getUser(false,vm.userId);
        };
    }

    angular.module('hiraApp')
        .controller('UsersDetailsViewCtrl', UsersDetailsViewCtrl);

})());
