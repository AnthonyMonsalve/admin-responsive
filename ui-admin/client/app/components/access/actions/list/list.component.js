/**
 * Created by daniel on 1/18/17.
 */
// usage: <resources-component></name-component>
((function() {
    'use strict';

    var ActionsListComponent = {
        controller: 'ActionsListCtrl',
        controllerAs: 'vm',
        templateUrl: 'app/components/access/actions/list/list.html'
    };

    angular
        .module('hiraApp')
        .component('actionsListComponent', ActionsListComponent);

})());