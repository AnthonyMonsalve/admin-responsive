/**
 * Created by daniel on 1/18/17.
 */

((function() {
    'use strict';

    var UnitsSelectComponent = {
        bindings: {
            model: '='
        },
        controller: 'UnitsSelectCtrl',
        controllerAs: 'vm',
        templateUrl: 'app/components/catalogues/units/select/select.html'
    };

    angular
        .module('hiraApp')
        .component('unitsSelectComponent', UnitsSelectComponent);

})());