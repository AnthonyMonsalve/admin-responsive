((function() {
    'use strict';

    var PromoMenComponent = {
        controller: 'canjeoListCtrl',
        controllerAs: 'vm',
        templateUrl: 'app/components/business/prodata/canjeo/canjeo.html'
    };

    angular
        .module('hiraApp')
        .component('canjeoListComponent', PromoMenComponent);

})());