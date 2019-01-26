((function() {
    'use strict';

    var PromoMenComponent = {
        controller: 'recargaListCtrl',
        controllerAs: 'vm',
        templateUrl: 'app/components/business/prodata/recarga/recarga.html'
    };

    angular
        .module('hiraApp')
        .component('recargaListComponent', PromoMenComponent);

})());
