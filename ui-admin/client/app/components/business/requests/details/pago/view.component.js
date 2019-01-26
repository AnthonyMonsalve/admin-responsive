((function() {
    'use strict';

    var RequestPagoViewComponent = {
        bindings: {
            requestId: '<'
        },
        controller: 'RequestPagoViewCtrl',
        controllerAs: 'vm',
        templateUrl: 'app/components/business/requests/details/pago/view.html'
    };

    angular
        .module('hiraApp')
        .component('requestPagoViewComponent', RequestPagoViewComponent);

})());