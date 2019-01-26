((function () {

    'use strict';

    /*@ngInject*/
    function UsersListCtrl(common, UsersSvc, UsersListSvc, SweetAlert, NotificationsSvc) {
        var vm = this;

        vm.selected = [];

        function getUsers(forceRemote) {
            return UsersListSvc.getUsers(forceRemote).then(function(users){
                vm.users = users;
            });
        }

        /*PRIVATE FUNCTIONS*/
        function activate() {
            getUsers(false);
        }

        activate();

        function deleteUsersBatch(userIds){
            SweetAlert.swal({
                title: "Are you sure?",
                text: "This operation can not be undone.",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#f44336",
                confirmButtonText: "Yes!",
                closeOnConfirm: true
            },
            function(resp){
                if (resp) {
                    UsersSvc.removeUsersBatch(userIds).then(function(){
                        getUsers(true);
                        vm.selected = [];
                        NotificationsSvc.fast("Successfully deleted","success");
                    })
                }
            });
        }

        function showInfo(id) {
           common.$state.go("content.access.users.show.details.view",{userId:id});
        }

        vm.deleteUsersBatch = deleteUsersBatch;
        vm.getUsers = getUsers;
        vm.showInfo = showInfo;
    }

    angular.module('hiraApp')
        .controller('UsersListCtrl', UsersListCtrl);

})());
