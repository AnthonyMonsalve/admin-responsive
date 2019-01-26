((function() {
    'use strict';

    var ClientDetailsSonsComponent = {
        bindings: {
            mom: '<',
            momail: '<'
        },
        controller: 'ClientDetailsSonsCtrl',
        controllerAs: 'sn',
        templateUrl: 'app/components/business/clients/details/sons/sons.html'
    };

    angular
        .module('hiraApp')
        .component('clientDetailsSonsComponent', ClientDetailsSonsComponent);

})());
