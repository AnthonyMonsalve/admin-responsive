((function() {
    'use strict';

    var ResourceDetailsActionsListComponent = {
        bindings: {
            resourceId: '<'
        },
        controller: 'ResourceDetailsActionsListCtrl',
        controllerAs: 'vm',
        templateUrl: 'app/components/access/resources/details/actions/list/list.html'
    };

    angular
        .module('hiraApp')
        .component('resourceDetailsActionsListComponent', ResourceDetailsActionsListComponent);

})());