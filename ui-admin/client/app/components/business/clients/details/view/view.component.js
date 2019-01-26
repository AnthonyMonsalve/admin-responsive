
((function() {
    'use strict';

    var ClientDetailsViewComponent = {
        bindings: {
            clientId: '<'
        },
        controller: 'ClientDetailsViewCtrl',
        controllerAs: 'vm',
        templateUrl: 'app/components/business/clients/details/view/view.html'
    };

    angular
        .module('hiraApp')
        .component('clientDetailsViewComponent', ClientDetailsViewComponent);

})());