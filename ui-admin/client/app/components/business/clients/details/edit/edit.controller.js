((function() {

    'use strict';

    /*@ngInject*/
    function ClientDetailsEditCtrl(common, ClientDetailsSvc, ClientsDetailsCluster, ClientsSvc, NotificationsSvc, $q) {
        var vm = this;

        var findDiff = common.findDiff;

        vm.edit = {};
        vm.clientEdit = {};

        function getClient(forceRemote, clientId) {
            return ClientDetailsSvc.getClient(forceRemote, clientId).then(function(client) {
                // //Reconver Shit
                // console.log('get client'+forceRemote)
                client.data.balance= client.data.balance/100
                // console.log(client.data.balance)
                // client.data.deuda/=100
                vm.clientEdit = client.data;
                reset();
            });
        }

        vm.$onInit = function() {
          console.log('oninit');
            getClient(true, vm.clientId);
        };

        function reset() {
          //ReconverShit
            //vm.clientEdit.balance /= 100
            vm.clientEdit.deuda*=0.01
            console.info(vm.clientEdit);
            vm.edit = angular.copy(vm.clientEdit);
            vm.banks = angular.copy(vm.edit.bank_accounts[0]);
            vm.bankEdit = angular.copy(vm.edit.bank_accounts[0]);
            delete vm.edit.bank_accounts;
            delete vm.clientEdit.bank_accounts;
        }

        function updateBank(data, clientId, bankId) {
            return ClientsSvc.updateBank(data, clientId, bankId)
                .then(function(res) {
                    return res
                })
                .catch(function(err) {
                    if (err.status == '400') {
                        vm.validationErrors = err.data;
                        throw err;
                    }

                    if (err.status == '500') {
                        vm.serverError = 'Server error!';
                        throw err;
                    }
                });
        }

        function updateClient(form, clientId) {
            if (form.$valid) {
                console.info(vm.clientEdit);
                console.log(vm.edit);
                var changes = findDiff(vm.clientEdit, vm.edit);
                console.log(changes);
                if (changes.hasOwnProperty('balance')){delete changes.balance}
                if (changes.hasOwnProperty('dataFilter')){delete changes.dataFilter}
                if (changes.hasOwnProperty('blocked')){delete changes.blocked}
                if (changes.hasOwnProperty('active')){delete changes.active}
                if (changes.hasOwnProperty('promo')){delete changes.promo}
                if (changes.hasOwnProperty('admin_options')){delete changes.admin_options}
                console.log(changes);
                if (vm.bankEdit!=undefined){
                    var dataToChange = { "active": vm.bankEdit.active, "account_number": vm.bankEdit.account_number, "account_type": vm.bankEdit.account_type }
                    var bankChanges = findDiff(vm.banks, vm.bankEdit);
                }else{
                    var bankChanges = null;
                };


                var changeBank = false,
                    changeBasic = false;

                // Banks changes
                if (bankChanges!=null) {
                    var bankPromise = updateBank(dataToChange, clientId, vm.bankEdit._id);
                } else {
                    var bankPromise = $q.defer();
                }

                // Basic info changes
                if (Object.keys(changes).length > 0) {
                    console.log(changes)
                    if (changes.deuda){changes.deuda*=100}
                    if (changes.hasOwnProperty('balance')){delete changes.balance}
                    if (isNaN(changes.deuda)){delete changes.deuda}
                    var changesPromise = ClientsSvc.updateClient(clientId, changes);
                } else {
                    var changesPromise = $q.defer();
                }

                $q.all([bankPromise, changesPromise]).then(function(res) {

                    if (res[0].promise && res[1].promise) {
                        NotificationsSvc.fast("No changes detected", "warning");
                        return;
                    } else {
                        form.$setPristine();
                        vm.validationErrors = [];
                        NotificationsSvc.fast("Changes saved", "success");
                        vm.edit = {};
                        vm.clientEdit = {};
                        common.$state.go("content.business.clients.show.details.view");
                    }

                });

            }
        }

        vm.updateClient = updateClient;

    }

    angular.module('hiraApp')
        .controller('ClientDetailsEditCtrl', ClientDetailsEditCtrl);

})());
