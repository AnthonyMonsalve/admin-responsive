/**
 * Created by daniel on 1/18/17.
 */
((function() {
    'use strict';

    var ClientDetailsEditComponent = {
        bindings: {
            clientId: '<'
        },
        controller: 'ClientDetailsEditCtrl',
        controllerAs: 'vm',
        templateUrl: 'app/components/business/clients/details/edit/edit.html'
    };

    angular
        .module('hiraApp')
        .component('clientDetailsEditComponent', ClientDetailsEditComponent);

})());