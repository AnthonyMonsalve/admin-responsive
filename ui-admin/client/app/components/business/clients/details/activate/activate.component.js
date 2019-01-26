((function() {
    'use strict';

    var ClientDetailsActivateComponent = {
        bindings: {
            clientId: '<'
        },
        controller: 'ClientDetailsActivateCtrl',
        controllerAs: 'ac',
        templateUrl: 'app/components/business/clients/details/activate/activate.html'
    };

    angular
        .module('hiraApp')
        .component('clientDetailsActivateComponent', ClientDetailsActivateComponent);

})());
