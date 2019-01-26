((function() {
    'use strict';

    var PromoMenComponent = {
        controller: 'diarioListCtrl',
        controllerAs: 'vm',
        templateUrl: 'app/components/business/diario/list/list.html'
    };

    angular
        .module('hiraApp')
        .component('diarioListComponent', PromoMenComponent);

})());