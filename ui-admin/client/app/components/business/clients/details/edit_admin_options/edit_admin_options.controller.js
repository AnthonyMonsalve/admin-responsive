((function() {

    'use strict';

    /*@ngInject*/
    function ClientDetailsEditAdminOptionsCtrl(common, ClientDetailsSvc, ClientsDetailsCluster, ClientsSvc, NotificationsSvc, $q) {
        var vm = this;

        var findDiff = common.findDiff;

        vm.edit = {};
        vm.client = {};

        function getClient(forceRemote, clientId) {
            console.log("entrando")
            return ClientDetailsSvc.getClient(forceRemote, clientId).then(function(client) {
                vm.client = client.data;
                if(!!vm.client.admin_options.tarifa){
                  vm.client.admin_options.tarifa = vm.client.admin_options.tarifa/100
                }
                //reset();
            });
        }

        vm.$onInit = function() {
            getClient(true, vm.clientId);
            console.log(vm);
        };

        function reset() {
            vm.edit = angular.copy(vm.client);
            vm.adminOptionsEdit = angular.copy(vm.client.admin_options);
        }

        function updateClient(form, clientId) {
            if (form.$valid) {
                var adminOptionsChanges = vm.client.admin_options

                var changeBank = false,
                    changeBasic = false,
                    changeAdmin = false;

                // Admin options changes
                console.log(Object.keys(adminOptionsChanges).length);
                if (Object.keys(adminOptionsChanges).length > 0) {
                    if (!!adminOptionsChanges.tarifa){
                      adminOptionsChanges.tarifa = adminOptionsChanges.tarifa*100
                    }
                    if (!!adminOptionsChanges._id){
                        delete adminOptionsChanges._id
                    }
                    console.log(adminOptionsChanges);
                    var adminPromise = ClientsSvc.updateClientAdminOptions(clientId, adminOptionsChanges);
                } else {
                    var adminPromise = $q.defer();
                }

                $q.all([adminPromise]).then(function(res) {

                    if (res[0].promise) {
                        NotificationsSvc.fast("No changes detected", "warning");
                        return;
                    } else {
                        form.$setPristine();
                        vm.validationErrors = [];
                        NotificationsSvc.fast("Changes saved", "success");
                        common.$state.go("content.business.clients.show.details.view");
                    }

                });

            }
        }

        vm.updateClient = updateClient;

    }

    angular.module('hiraApp')
        .controller('ClientDetailsEditAdminOptionsCtrl', ClientDetailsEditAdminOptionsCtrl);

})());
