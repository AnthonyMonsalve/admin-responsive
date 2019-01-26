((function() {
    'use strict';

    var ClientDetailsViewDeudasComponent = {
        bindings: {
            clientId: '<'
        },
        controller: 'ClientDetailsViewDeudasCtrl',
        controllerAs: 'vm',
        templateUrl: 'app/components/business/clients/details/view/deudas/deudas.html'
    };

    angular
        .module('hiraApp')
        .component('clientDetailsViewDeudasComponent', ClientDetailsViewDeudasComponent);

})());