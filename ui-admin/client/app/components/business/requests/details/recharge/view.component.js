/**
 * Created by daniel on 1/18/17.
 */
((function() {
    'use strict';

    var RequestRechargeViewComponent = {
        bindings: {
            requestId: '<'
        },
        controller: 'RequestRechargeViewCtrl',
        controllerAs: 'vm',
        templateUrl: 'app/components/business/requests/details/recharge/view.html'
    };

    angular
        .module('hiraApp')
        .component('requestRechargeViewComponent', RequestRechargeViewComponent);

})());