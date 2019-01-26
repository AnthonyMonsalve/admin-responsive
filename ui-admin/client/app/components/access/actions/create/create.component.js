/**
 * Created by daniel on 1/18/17.
 */

((function() {
    'use strict';

    var ActionsCreateComponent = {
        controller: 'ActionsCreateCtrl',
        controllerAs: 'vm',
        templateUrl: 'app/components/access/actions/create/create.html'
    };

    angular
        .module('hiraApp')
        .component('actionsCreateComponent', ActionsCreateComponent);

})());