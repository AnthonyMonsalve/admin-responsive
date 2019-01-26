/**
 * Created by daniel on 1/18/17.
 */

((function() {
    'use strict';

    var UnitsListComponent = {
        controller: 'UnitsListCtrl',
        controllerAs: 'vm',
        templateUrl: 'app/components/catalogues/units/list/list.html'
    };

    angular
        .module('hiraApp')
        .component('unitsListComponent', UnitsListComponent);

})());