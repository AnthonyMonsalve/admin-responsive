((function() {

    'use strict';

    /*@ngInject*/
    function BorrowersListCtrl(common,
        RequestsSvc,
        RequestsListSvc,
        SweetAlert,
        NotificationsSvc) {
        var vm = this;
        var $state = common.$state;

        vm.selected = [];
        vm.today = new Date();
        vm.filter = RequestsListSvc.getFilter();
        vm.query = vm.filter.query;
        vm.dataLoaded = false;

        function getOperationRef(id){
          return parseInt(id,16).toString(10).slice(10,16)
        }
        vm.getOperationRef = getOperationRef
        function getRequests(forceRemote) {
            vm.requests = [];
            vm.dataLoaded = false;
            delete vm.query.type;
            return RequestsListSvc.getRequests(forceRemote).then(function(requests) {
                vm.requests = requests;

                vm.dataLoaded = true;
                console.log(requests);
            });
        }


        /*PRIVATE FUNCTIONS*/
        vm.$onInit = function() {
            getRequests(true);
        };

        function removeBorrowersBatch(borrower_ids) {
            SweetAlert.swal({
                    title: "Are you sure?",
                    text: "This operation can not be undone.",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#f44336",
                    confirmButtonText: "Yes!",
                    closeOnConfirm: true
                },
                function(resp) {
                    if (resp) {
                        RequestsSvc.removeBorrowersBatch(borrower_ids).then(function() {
                            getRequests(true);
                            vm.selected = [];
                            NotificationsSvc.fast("Successfully deleted", "success");
                        })
                    }
                });
        }

        function sortBy(attr) {
            vm.dataLoaded = false;
            vm.filter.sortBy(attr);
            getRequests(true);
        }

        function getType(type) {
            if (type == "ContactUs")
                return "Solicitud de contacto"
            else if (type == "WithdrawalRequest")
                return "Solicitud de canjeo"
            else if (type == "RechargeRequest")
                return "Solicitud de recarga"
            else if (type == "BankAccountActivation")
                return "Solicitud de activación de cuenta"
            else if (type == "PagoRequest")
                return "Pago de Deuda"
        }

        function bankIf(type){
            if (type == "ContactUs")
                return true
            else if (type == "WithdrawalRequest")
                return true
            else if (type == "RechargeRequest")
                return false
            else if (type == "BankAccountActivation")
                return false
            else if (type == "PagoRequest")
                return false
        }

        function goToSpecificRequest(type, id) {
            if (type == "ContactUs")
                $state.go('content.business.requests.show.contact.view', { requestId: id })
            else if (type == "WithdrawalRequest")
                $state.go('content.business.requests.show.withdrawal.view', { requestId: id })
            else if (type == "RechargeRequest")
                $state.go('content.business.requests.show.recharge.view', { requestId: id })
            else if (type == "BankAccountActivation")
                $state.go('content.business.requests.show.bankAccountActivation.view', { requestId: id })
            else if (type == 'PagoRequest')
                $state.go('content.business.requests.show.pago.view',{requestId:id})
        }

        vm.goToSpecificRequest = goToSpecificRequest;
        vm.getType = getType;
        vm.removeBorrowersBatch = removeBorrowersBatch;
        vm.sortBy = sortBy;
        vm.getRequests = getRequests;
        vm.bankIf = bankIf
    }

    angular.module('hiraApp')
        .controller('BorrowersListCtrl', BorrowersListCtrl);

})());
