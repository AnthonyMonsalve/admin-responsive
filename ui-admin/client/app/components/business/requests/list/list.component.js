/**
 * Created by daniel on 1/18/17.
 */
((function() {
    'use strict';

    var RequestsListComponent = {
        controller: 'BorrowersListCtrl',
        controllerAs: 'vm',
        templateUrl: 'app/components/business/requests/list/list.html'
    };

    angular
        .module('hiraApp')
        .component('requestsListComponent', RequestsListComponent);

})());