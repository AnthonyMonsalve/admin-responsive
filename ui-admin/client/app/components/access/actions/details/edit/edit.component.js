/**
 * Created by daniel on 1/18/17.
 */
// usage: <resources-component></name-component>
((function() {
    'use strict';

    var ActionDetailsEditComponent = {
        bindings: {
            actionId: '<',
            resourceId: '<'
        },
        controller: 'ActionDetailsEditCtrl',
        controllerAs: 'vm',
        templateUrl: 'app/components/access/actions/details/edit/edit.html'
    };

    angular
        .module('hiraApp')
        .component('actionDetailsEditComponent', ActionDetailsEditComponent);

})());