/**
 * Created by daniel on 1/18/17.
 */
((function() {
    'use strict';

    var ResourceDetailsActionsCreateComponent = {
        bindings: {
            resourceId: '<',
            state: '='
        },
        controller: 'ResourceDetailsActionsCreateCtrl',
        controllerAs: 'vm',
        templateUrl: 'app/components/access/resources/details/actions/create/create.html'
    };

    angular
        .module('hiraApp')
        .component('resourceDetailsActionsCreateComponent', ResourceDetailsActionsCreateComponent);

})());