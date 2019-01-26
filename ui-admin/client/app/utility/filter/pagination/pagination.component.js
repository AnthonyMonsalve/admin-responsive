/**
 * Created by daniel on 1/18/17.
 */
((function() {
    'use strict';

    var FilterPaginationComponent = {
        bindings: {
            getList: '&',
            filter: '<',
            total: '='
        },
        controller: 'FilterPaginationCtrl',
        controllerAs: 'vm',
        templateUrl: 'app/utility/filter/pagination/pagination.html'
    };

    angular
        .module('hiraApp')
        .component('filterPaginationComponent', FilterPaginationComponent);

})());