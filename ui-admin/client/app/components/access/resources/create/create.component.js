/**
 * Created by daniel on 1/18/17.
 */

((function() {
    'use strict';

    var ResourcesCreateComponent = {
        controller: 'ResourcesCreateCtrl',
        controllerAs: 'vm',
        templateUrl: 'app/components/access/resources/create/create.html'
    };

    angular
        .module('hiraApp')
        .component('resourcesCreateComponent', ResourcesCreateComponent);

})());