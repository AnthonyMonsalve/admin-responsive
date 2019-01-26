/**
 * Created by daniel on 1/18/17.
 */
((function() {
    'use strict';

    var RoleDetailsPreviewComponent = {
        bindings: {
            roleId: '<'
        },
        controller: 'RolesDetailsPreviewCtrl',
        controllerAs: 'vm',
        templateUrl: 'app/components/access/roles/details/preview/preview.html'
    };

    angular
        .module('hiraApp')
        .component('roleDetailsPreviewComponent', RoleDetailsPreviewComponent);

})());