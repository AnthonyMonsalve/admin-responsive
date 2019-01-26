/**
 * Created by daniel on 1/18/17.
 */
((function() {
    'use strict';

    var RoleDetailsEditComponent = {
        bindings: {
            roleId: '<'
        },
        controller: 'RoleDetailsEditCtrl',
        controllerAs: 'vm',
        templateUrl: 'app/components/access/roles/details/edit/edit.html'
    };

    angular
        .module('hiraApp')
        .component('roleDetailsEditComponent', RoleDetailsEditComponent);

})());