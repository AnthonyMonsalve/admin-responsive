/**
 * Created by daniel on 1/18/17.
 */
((function() {
    'use strict';

    var RoleDetailsStatePermissionsListComponent = {
        bindings: {
            roleId: '<'
        },
        controller: 'RoleDetailsStatePermissionsListCtrl',
        controllerAs: 'vm',
        templateUrl: 'app/components/access/roles/details/permissions/states/list/list.html'
    };

    angular
        .module('hiraApp')
        .component('roleDetailsStatePermissionsListComponent', RoleDetailsStatePermissionsListComponent);

})());