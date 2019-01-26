((function() {
    'use strict';

    var histoReComponent = {
        controller: 'histoReCtrl',
        controllerAs: 'vm',
        templateUrl: 'app/components/business/histore/list/list.html'
    };

    angular
        .module('hiraApp')
        .component('histoReComponent', histoReComponent);

})());