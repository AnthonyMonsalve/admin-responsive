/**
 * Created by daniel on 1/18/17.
 */
// usage: <resources-component></name-component>
((function() {
    'use strict';

    var StatesListComponent = {
        controller: 'StatesListCtrl',
        controllerAs: 'vm',
        templateUrl: 'app/components/access/states/list/list.html'
    };

    angular
        .module('hiraApp')
        .component('statesListComponent', StatesListComponent);

})());