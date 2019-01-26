/**
 * Created by daniel on 1/18/17.
 */
// usage: <resources-component></name-component>
((function() {
    'use strict';

    var ResourceDetailsEditComponent = {
        bindings: {
            resourceId: '<'
        },
        controller: 'ResourceDetailsEditCtrl',
        controllerAs: 'vm',
        templateUrl: 'app/components/access/resources/details/edit/edit.html'
    };

    angular
        .module('hiraApp')
        .component('resourceDetailsEditComponent', ResourceDetailsEditComponent);

})());