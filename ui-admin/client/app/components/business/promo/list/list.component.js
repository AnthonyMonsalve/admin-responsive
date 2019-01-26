((function() {
    'use strict';

    var PromoMenComponent = {
        controller: 'promoListCtrl',
        controllerAs: 'vm',
        templateUrl: 'app/components/business/promo/list/list.html'
    };

    angular
        .module('hiraApp')
        .component('promoMenComponent', PromoMenComponent);

})());