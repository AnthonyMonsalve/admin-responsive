
((function() {
    'use strict';

    var ClientsListComponent = {
        controller: 'ClientsListCtrl',
        controllerAs: 'vm',
        templateUrl: 'app/components/business/clients/list/list.html'
    };

    angular
        .module('hiraApp')
        .component('clientsListComponent', ClientsListComponent);

})());