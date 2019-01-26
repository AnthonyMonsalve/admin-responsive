/**
 * Created by daniel on 1/18/17.
 */

((function() {
    'use strict';

    var RolesListComponent = {
        controller: 'RolesListCtrl',
        controllerAs: 'vm',
        templateUrl: 'app/components/access/roles/list/list.html'
    };

    angular
        .module('hiraApp')
        .component('rolesListComponent', RolesListComponent);

})());