/**
 * Created by daniel on 1/18/17.
 */
((function() {
    'use strict';

    var RequestContactViewComponent = {
        bindings: {
            requestId: '<'
        },
        controller: 'RequestContactViewCtrl',
        controllerAs: 'vm',
        templateUrl: 'app/components/business/requests/details/contact/view.html'
    };

    angular
        .module('hiraApp')
        .component('requestContactViewComponent', RequestContactViewComponent);

})());