/**
 * Created by daniel on 1/18/17.
 */

((function() {
    'use strict';

    var RolesCreateComponent = {
        controller: 'RolesCreateCtrl',
        controllerAs: 'vm',
        templateUrl: 'app/components/access/roles/create/create.html'
    };

    angular
        .module('hiraApp')
        .component('rolesCreateComponent', RolesCreateComponent);

})());