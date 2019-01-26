/**
 * Created by daniel on 1/18/17.
 */
// usage: <resources-component></name-component>
((function() {
    'use strict';

    var ResourcesListComponent = {
        controller: 'ResourcesListCtrl',
        controllerAs: 'vm',
        templateUrl: 'app/components/access/resources/list/list.html'
    };

    angular
        .module('hiraApp')
        .component('resourcesListComponent', ResourcesListComponent);

})());