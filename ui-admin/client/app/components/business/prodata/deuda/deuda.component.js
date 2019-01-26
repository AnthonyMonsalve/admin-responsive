((function() {
    'use strict';

    var PromoMenComponent = {
        controller: 'deudaCtrl',
        controllerAs: 'vm',
        templateUrl: 'app/components/business/prodata/deuda/deuda.html'
    };

    angular
        .module('hiraApp')
        .component('deudaListComponent', PromoMenComponent);

})());