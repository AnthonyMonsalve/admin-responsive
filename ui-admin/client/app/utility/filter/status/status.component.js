/**
 * Created by daniel on 1/18/17.
 */
((function() {
    'use strict';

    var FilterStatusComponent = {
        bindings: {
            getList: '&',
            filter: '<'
        },
        controller: 'FilterStatusCtrl',
        controllerAs: 'vm',
        templateUrl: 'app/utility/filter/status/status.html'
    };

    angular
        .module('hiraApp')
        .component('filterStatusComponent', FilterStatusComponent);

})());