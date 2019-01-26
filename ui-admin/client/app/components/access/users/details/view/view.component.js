/**
 * Created by daniel on 1/18/17.
 */
((function() {
    'use strict';

    var UserDetailsViewComponent = {
        bindings: {
            userId: '<'
        },
        controller: 'UsersDetailsViewCtrl',
        controllerAs: 'vm',
        templateUrl: 'app/components/access/users/details/view/view.html'
    };

    angular
        .module('hiraApp')
        .component('userDetailsViewComponent', UserDetailsViewComponent);

})());