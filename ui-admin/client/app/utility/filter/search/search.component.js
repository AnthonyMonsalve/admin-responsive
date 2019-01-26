/**
 * Created by daniel on 1/18/17.
 */
((function() {
    'use strict';

    var FilterSearchComponent = {
        bindings: {
            getList: '&',
            filter: '<'
        },
        controller: 'FilterSearchCtrl',
        controllerAs: 'vm',
        templateUrl: 'app/utility/filter/search/search.html'
    };

    angular
        .module('hiraApp')
        .component('filterSearchComponent', FilterSearchComponent);

})());