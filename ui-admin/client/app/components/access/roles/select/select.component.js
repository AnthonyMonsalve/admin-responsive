/**
 * Created by daniel on 1/18/17.
 */

((function() {
    'use strict';

    var RolesSelectComponent = {
        bindings: {
            model: '='
        },
        controller: 'RolesSelectCtrl',
        controllerAs: 'vm',
        templateUrl: 'app/components/access/roles/select/select.html'
    };

    angular
        .module('hiraApp')
        .component('rolesSelectComponent', RolesSelectComponent);

})());