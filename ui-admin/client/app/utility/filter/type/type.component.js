/**
 * Created by daniel on 1/18/17.
 */
((function() {
    'use strict';

    var FilterTypeComponent = {
        bindings: {
            getList: '&',
            filter: '<'
        },
        controller: 'FilterTypeCtrl',
        controllerAs: 'vm',
        templateUrl: 'app/utility/filter/type/type.html'
    };

    angular
        .module('hiraApp')
        .component('filterTypeComponent', FilterTypeComponent);

})());