/**
 * Created by daniel on 1/18/17.
 */
((function() {
    'use strict';

    var RequestsListContactComponent = {
        controller: 'BorrowersListContactCtrl',
        controllerAs: 'vm',
        templateUrl: 'app/components/business/requests/list/contact/contact.html'
    };

    angular
        .module('hiraApp')
        .component('requestsListContactComponent', RequestsListContactComponent);

})());