((function () {

    'use strict';

    /*@ngInject*/
    function AccountProfileCtrl(common,Auth,NotificationsSvc, Connections) {
        var vm = this;

        vm.currentUser = Auth.getCurrentUser();

        /*PRIVATE FUNCTIONS*/
        function activate() {
            common.$http({
                method: 'GET',
                url: Connections.getAccessServer() + '/access/users/me'
            }).then(function(res){
                vm.user = res.data;
            });
        }

        /*DEFINITION OF VARIABLES*/
        activate();

        function notify(){
            NotificationsSvc.fast("This will be is a future feature","warning");
        }

        vm.notify = notify;

    }

    angular.module('hiraApp')
        .controller('AccountProfileCtrl', AccountProfileCtrl);

})());
