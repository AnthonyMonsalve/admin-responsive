/**
 * Created by daniel on 1/18/17.
 */
((function() {
    'use strict';

    var RoleDetailsViewComponent = {
        bindings: {
            roleId: '<'
        },
        controller: 'RolesDetailsViewCtrl',
        controllerAs: 'vm',
        templateUrl: 'app/components/access/roles/details/view/view.html'
    };

    angular
        .module('hiraApp')
        .component('roleDetailsViewComponent', RoleDetailsViewComponent);

})());