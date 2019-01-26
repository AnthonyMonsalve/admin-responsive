/**
 * Created by daniel on 1/18/17.
 */
((function() {
    'use strict';

    var UserDetailsEditComponent = {
        bindings: {
            userId: '<'
        },
        controller: 'UsersDetailsEditCtrl',
        controllerAs: 'vm',
        templateUrl: 'app/components/access/users/details/edit/edit.html'
    };

    angular
        .module('hiraApp')
        .component('userDetailsEditComponent', UserDetailsEditComponent);

})());