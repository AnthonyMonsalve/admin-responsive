/**
 * Created by daniel on 1/18/17.
 */

((function() {
    'use strict';

    var UsersListComponent = {
        controller: 'UsersListCtrl',
        controllerAs: 'vm',
        templateUrl: 'app/components/access/users/list/list.html'
    };

    angular
        .module('hiraApp')
        .component('usersListComponent', UsersListComponent);

})());