/**
 * Created by daniel on 1/18/17.
 */
((function() {
    'use strict';

    var UserDetailsRolesComponent = {
        bindings: {
            userId: '<'
        },
        controller: angular.noop,
        controllerAs: 'vm',
        templateUrl: 'app/components/access/users/details/roles/roles.html'
    };

    angular
        .module('hiraApp')
        .component('userDetailsRolesComponent', UserDetailsRolesComponent);

})());