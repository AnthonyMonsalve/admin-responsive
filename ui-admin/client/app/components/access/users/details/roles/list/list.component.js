/**
 * Created by daniel on 1/18/17.
 */
// usage: <resources-component></name-component>
((function() {
    'use strict';

    var UserDetailsRolesListComponent = {
        bindings: {
            userId: '<',
            showDelete: '<'
        },
        controller: 'UserDetailsRolesListCtrl',
        controllerAs: 'vm',
        templateUrl: 'app/components/access/users/details/roles/list/list.html'
    };

    angular
        .module('hiraApp')
        .component('userDetailsRolesListComponent', UserDetailsRolesListComponent);

})());