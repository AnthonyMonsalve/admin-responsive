((function() {
    'use strict';

    var FastListComponent = {
        controller: 'fastListCtrl',
        controllerAs: 'vm',
        templateUrl: 'app/components/business/fast/list/list.html'
    };

    angular
        .module('hiraApp')
        .component('fastListComponent', FastListComponent);

})());