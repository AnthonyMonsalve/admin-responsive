/**
 * Created by daniel on 1/18/17.
 */
((function() {
    'use strict';

    var ResourceDetailsActionsComponent = {
        bindings: {
            resourceId: '<'
        },
        controller: 'ResourceDetailsActionsCtrl',
        controllerAs: 'vm',
        templateUrl: 'app/components/access/resources/details/actions/actions.html'
    };

    angular
        .module('hiraApp')
        .component('resourceDetailsActionsComponent', ResourceDetailsActionsComponent);

})());