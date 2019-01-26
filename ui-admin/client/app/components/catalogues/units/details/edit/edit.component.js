/**
 * Created by daniel on 1/18/17.
 */
((function() {
    'use strict';

    var UnitDetailsEditComponent = {
        bindings: {
            unitId: '<'
        },
        controller: 'UnitDetailsEditCtrl',
        controllerAs: 'vm',
        templateUrl: 'app/components/catalogues/units/details/edit/edit.html'
    };

    angular
        .module('hiraApp')
        .component('unitDetailsEditComponent', UnitDetailsEditComponent);

})());