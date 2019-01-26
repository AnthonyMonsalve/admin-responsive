((function() {
    'use strict';

    var histoReComponent = {
        controller: 'deudasCtrl',
        controllerAs: 'vm',
        templateUrl: 'app/components/business/deudas/list/list.html'
    };

    angular
        .module('hiraApp')
        .component('deudasComponent', histoReComponent);

})());