/**
 * Created by daniel on 1/18/17.
 */

((function() {
    'use strict';

    var StatesCreateComponent = {
        controller: 'StatesCreateCtrl',
        controllerAs: 'vm',
        templateUrl: 'app/components/access/states/create/create.html'
    };

    angular
        .module('hiraApp')
        .component('statesCreateComponent', StatesCreateComponent);

})());