/**
 * Created by daniel on 1/18/17.
 */
((function() {
    'use strict';

    var UserDetailsRolesCreateComponent = {
        bindings: {
            userId: '<'
        },
        controller: 'UserDetailsRolesCreateCtrl',
        controllerAs: 'vm',
        templateUrl: 'app/components/access/users/details/roles/create/create.html'
    };

    angular
        .module('hiraApp')
        .component('userDetailsRolesCreateComponent', UserDetailsRolesCreateComponent);

})());