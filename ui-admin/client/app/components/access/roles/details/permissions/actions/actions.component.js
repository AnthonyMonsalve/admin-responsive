/**
 * Created by daniel on 1/18/17.
 */
((function() {
    'use strict';

    var RoleDetailsActionPermissionsComponent = {
        bindings: {
            roleId: '<'
        },
        controller: angular.noop,
        controllerAs: 'vm',
        templateUrl: 'app/components/access/roles/details/permissions/actions/actions.html'
    };

    angular
        .module('hiraApp')
        .component('roleDetailsActionPermissionsComponent', RoleDetailsActionPermissionsComponent);

})());