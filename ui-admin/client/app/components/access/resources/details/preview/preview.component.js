/**
 * Created by daniel on 1/18/17.
 */
// usage: <resources-component></name-component>
((function() {
    'use strict';

    var ResourceDetailsPreviewComponent = {
        bindings: {
            resourceId: '<'
        },
        controller: 'ResourceDetailsPreviewCtrl',
        controllerAs: 'vm',
        templateUrl: 'app/components/access/resources/details/preview/preview.html'
    };

    angular
        .module('hiraApp')
        .component('resourceDetailsPreviewComponent', ResourceDetailsPreviewComponent);

})());