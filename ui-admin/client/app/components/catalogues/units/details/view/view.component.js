/**
 * Created by daniel on 1/18/17.
 */
((function() {
    'use strict';

    var UnitDetailsViewComponent = {
        bindings: {
            unitId: '<'
        },
        controller: 'UnitsDetailsViewCtrl',
        controllerAs: 'vm',
        templateUrl: 'app/components/catalogues/units/details/view/view.html'
    };

    angular
        .module('hiraApp')
        .component('unitDetailsViewComponent', UnitDetailsViewComponent);

})());