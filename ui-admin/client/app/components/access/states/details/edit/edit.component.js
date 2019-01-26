/**
 * Created by daniel on 1/18/17.
 */
// usage: <resources-component></name-component>
((function() {
    'use strict';

    var StateDetailsEditComponent = {
        bindings: {
            stateId: '<'
        },
        controller: 'StateDetailsEditCtrl',
        controllerAs: 'vm',
        templateUrl: 'app/components/access/states/details/edit/edit.html'
    };

    angular
        .module('hiraApp')
        .component('stateDetailsEditComponent', StateDetailsEditComponent);

})());