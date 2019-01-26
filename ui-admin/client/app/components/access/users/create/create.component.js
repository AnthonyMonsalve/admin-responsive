/**
 * Created by daniel on 1/18/17.
 */

((function() {
    'use strict';

    var UserCreateComponent = {
        controller: 'UsersCreateCtrl',
        controllerAs: 'vm',
        templateUrl: 'app/components/access/users/create/create.html'
    };

    angular
        .module('hiraApp')
        .component('userCreateComponent', UserCreateComponent);

})());