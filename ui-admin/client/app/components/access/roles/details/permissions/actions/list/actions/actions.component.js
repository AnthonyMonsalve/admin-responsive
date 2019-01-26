/**
 * Created by daniel on 1/18/17.
 */
// usage: <resources-component></name-component>
((function() {
    'use strict';

    var RoleDetailsActionPermissionsListActionsComponent = {
        bindings: {
            roleId: '<',
            resourceId: '<',
            actions: '<',
            permissions: '<'
        },
        controller: 'RoleDetailsActionPermissionsListActionsCtrl',
        controllerAs: 'vm',
        templateUrl: 'app/components/access/roles/details/permissions/actions/list/actions/actions.html'
    };

    angular
        .module('hiraApp')
        .component('roleDetailsActionPermissionsListActionsComponent', RoleDetailsActionPermissionsListActionsComponent);

})());