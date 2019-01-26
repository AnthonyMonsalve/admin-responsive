/**
 * Created by daniel on 1/18/17.
 */
((function() {
    'use strict';

    var RoleDetailsActionPermissionsListComponent = {
        bindings: {
            roleId: '<'
        },
        controller: 'RoleDetailsActionPermissionsListCtrl',
        controllerAs: 'vm',
        templateUrl: 'app/components/access/roles/details/permissions/actions/list/list.html'
    };

    angular
        .module('hiraApp')
        .component('roleDetailsActionPermissionsListComponent', RoleDetailsActionPermissionsListComponent);

})());