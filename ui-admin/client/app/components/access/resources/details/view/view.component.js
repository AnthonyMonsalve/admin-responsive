/**
 * Created by daniel on 1/18/17.
 */
// usage: <resources-component></name-component>
((function() {
    'use strict';

    var ResourceDetailsViewComponent = {
        bindings: {
            resourceId: '<'
        },
        controller: 'ResourceDetailsViewCtrl',
        controllerAs: 'vm',
        templateUrl: 'app/components/access/resources/details/view/view.html'
    };

    angular
        .module('hiraApp')
        .component('resourceDetailsViewComponent', ResourceDetailsViewComponent);

})());