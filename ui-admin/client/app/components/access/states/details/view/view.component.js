/**
 * Created by daniel on 1/18/17.
 */
// usage: <resources-component></name-component>
((function() {
    'use strict';

    var StateDetailsViewComponent = {
        bindings: {
            stateId: '<'
        },
        controller: 'StateDetailsViewCtrl',
        controllerAs: 'vm',
        templateUrl: 'app/components/access/states/details/view/view.html'
    };

    angular
        .module('hiraApp')
        .component('stateDetailsViewComponent', StateDetailsViewComponent);

})());