((function () {

    'use strict';

    /*@ngInject*/
    function BorrowersListContactCtrl(common,
                                       RequestsSvc,
                                       RequestsListSvc,
                                       SweetAlert,
                                       NotificationsSvc) {
        var vm = this;
        var $state = common.$state;

        vm.selected = [];
        vm.today = new Date();
        vm.filter =  RequestsListSvc.getFilter();
        vm.query =  vm.filter.query;
        vm.dataLoaded = false;

        function getRequests(forceRemote) {
          vm.query.type = "ContactUs";
            return RequestsListSvc.getRequests(forceRemote).then(function(requests){
              vm.requests=[]
              for (var i =0; i<requests.data.list.length; i++){
                if (requests.data.list[i].type=="ContactUs")
                  vm.requests.push(requests.data.list[i])
              }
                vm.dataLoaded = true;
                console.log(vm.requests);
            });
        }

        /*PRIVATE FUNCTIONS*/
        vm.$onInit = function() {
            getRequests(true);
        };

        function removeBorrowersBatch(borrower_ids){
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
              RequestsSvc.removeBorrowersBatch(borrower_ids).then(function(){
                  getRequests(true);
                  vm.selected = [];
                  NotificationsSvc.fast("Successfully deleted","success");
              })
            }
          });
        }

        function sortBy(attr){
            vm.dataLoaded = false;
            vm.filter.sortBy(attr);
            getRequests(true);
        }

        function goToSpecificRequest(type,id) {
          if (type == "ContactUs")
            $state.go('content.business.requests.show.contact.view',{requestId:id})
          else if (type == "WithdrawalRequest")
            $state.go('content.business.requests.show.withdrawal.view',{requestId:id})
          else if (type == "RechargeRequest")
            $state.go('content.business.requests.show.recharge.view',{requestId:id})
          else if (type == "BankAccountActivation")
            $state.go('content.business.requests.show.bankAccountActivation.view',{requestId:id})
        }

        vm.goToSpecificRequest = goToSpecificRequest;

        vm.removeBorrowersBatch = removeBorrowersBatch;
        vm.sortBy = sortBy;
        vm.getRequests = getRequests;
    }

    angular.module('hiraApp')
        .controller('BorrowersListContactCtrl', BorrowersListContactCtrl);

})());
