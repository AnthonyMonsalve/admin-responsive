/**
 * Created by daniel on 1/18/17.
 */
((function() {
    'use strict';

    var FilterLimitComponent = {
        bindings: {
            getList: '&',
            filter: '<'
        },
        controller: 'FilterLimitCtrl',
        controllerAs: 'vm',
        templateUrl: 'app/utility/filter/limit/limit.html'
    };

    angular
        .module('hiraApp')
        .component('filterLimitComponent', FilterLimitComponent);

})());