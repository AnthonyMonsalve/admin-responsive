/**
 * Created by daniel on 1/18/17.
 */
((function() {
    'use strict';

    var RoleDetailsStatePermissionsComponent = {
        bindings: {
            roleId: '<'
        },
        controller: angular.noop,
        controllerAs: 'vm',
        templateUrl: 'app/components/access/roles/details/permissions/states/states.html'
    };

    angular
        .module('hiraApp')
        .component('roleDetailsStatePermissionsComponent', RoleDetailsStatePermissionsComponent);

})());