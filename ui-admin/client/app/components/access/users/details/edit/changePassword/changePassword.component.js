/**
 * Created by daniel on 1/18/17.
 */
((function() {
    'use strict';

    var UserDetailsEditChangePasswordComponent = {
        bindings: {
            userId: '<'
        },
        controller: 'UsersDetailsEditChangePasswordCtrl',
        controllerAs: 'vm',
        templateUrl: 'app/components/access/users/details/edit/changePassword/changePassword.html'
    };

    angular
        .module('hiraApp')
        .component('userDetailsEditChangePasswordComponent', UserDetailsEditChangePasswordComponent);

})());