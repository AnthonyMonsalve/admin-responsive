/**
 * Created by daniel on 1/18/17.
 */

((function() {
    'use strict';

    var UnitsCreateComponent = {
        controller: 'UnitsCreateCtrl',
        controllerAs: 'vm',
        templateUrl: 'app/components/catalogues/units/create/create.html'
    };

    angular
        .module('hiraApp')
        .component('unitsCreateComponent', UnitsCreateComponent);

})());