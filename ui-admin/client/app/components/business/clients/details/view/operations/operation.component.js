
((function() {
    'use strict';

    var ClientDetailsViewOperationComponent = {
        bindings: {
            clientId: '<',
            username: '<'
        },
        controller: 'ClientDetailsViewOperationCtrl',
        controllerAs: 'vm',
        templateUrl: 'app/components/business/clients/details/view/operations/operation.html'
    };

    angular
        .module('hiraApp')
        .component('clientDetailsViewOperationComponent', ClientDetailsViewOperationComponent);

})());