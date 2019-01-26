/**
 * Created by daniel on 1/18/17.
 */
((function() {
    'use strict';

    var clientDetailsEditAdminOptionsComponent = {
        bindings: {
            clientId: '<'
        },
        controller: 'ClientDetailsEditAdminOptionsCtrl',
        controllerAs: 'vm',
        templateUrl: 'app/components/business/clients/details/edit_admin_options/edit_admin_options.html'
    };

    angular
        .module('hiraApp')
        .component('clientDetailsEditAdminOptionsComponent', clientDetailsEditAdminOptionsComponent);

})());