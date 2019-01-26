/**
 * Created by daniel on 1/18/17.
 */
((function() {
    'use strict';

    var WithdrawalDetailsViewComponent = {
        bindings: {
            requestId: '<'
        },
        controller: 'WithdrawalDetailsViewCtrl',
        controllerAs: 'vm',
        templateUrl: 'app/components/business/requests/details/withdrawal/view.html'
    };

    angular
        .module('hiraApp')
        .component('withdrawalDetailsViewComponent', WithdrawalDetailsViewComponent);

})());