/**
 * Created by daniel on 1/18/17.
 */
// usage: <resources-component></name-component>
((function() {
    'use strict';

    var ActionDetailsViewComponent = {
        bindings: {
            actionId: '<',
            resourceId: '<'
        },
        controller: 'ActionDetailsViewCtrl',
        controllerAs: 'vm',
        templateUrl: 'app/components/access/actions/details/view/view.html'
    };

    angular
        .module('hiraApp')
        .component('actionDetailsViewComponent', ActionDetailsViewComponent);

})());