((function() {
    'use strict';

    var PromoMenComponent = {
        controller: 'transferenciaListCtrl',
        controllerAs: 'vm',
        templateUrl: 'app/components/business/prodata/transferencia/transferencia.html'
    };

    angular
        .module('hiraApp')
        .component('transferenciaListComponent', PromoMenComponent);

})());
