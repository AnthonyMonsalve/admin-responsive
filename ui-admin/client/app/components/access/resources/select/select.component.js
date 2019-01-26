/**
 * Created by daniel on 1/18/17.
 */
// usage: <resources-component></name-component>
((function() {
    'use strict';

    var ResourcesSelectComponent = {
        bindings: {
            model: '='
        },
        controller: 'ResourcesSelectCtrl',
        controllerAs: 'vm',
        templateUrl: 'app/components/access/resources/select/select.html'
    };

    angular
        .module('hiraApp')
        .component('resourcesSelectComponent', ResourcesSelectComponent);

})());