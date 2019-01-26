
((function() {
    'use strict';

    var ClientDetailsViewComponent = {
        bindings: {
            clientId: '<'
        },
        controller: 'DebDetailsViewCtrl',
        controllerAs: 'vm',
        templateUrl: 'app/components/business/deudas/details/details.html'
    };

    angular
        .module('hiraApp')
        .component('debDetailsViewComponent', ClientDetailsViewComponent);

})());