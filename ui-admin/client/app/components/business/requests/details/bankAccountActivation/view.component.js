/**
 * Created by daniel on 1/18/17.
 */
((function() {
    'use strict';

    var RequestBankAccountActivationViewComponent = {
        bindings: {
            requestId: '<'
        },
        controller: 'RequestequestBankAccountActivationViewCtrl',
        controllerAs: 'vm',
        templateUrl: 'app/components/business/requests/details/bankAccountActivation/view.html'
    };

    angular
        .module('hiraApp')
        .component('requestBankAccountActivationViewComponent', RequestBankAccountActivationViewComponent);

})());