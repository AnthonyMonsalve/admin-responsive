((function() {
    'use strict';

    var AccountProfileComponent = {
        controller: 'AccountProfileCtrl',
        controllerAs: 'vm',
        templateUrl: 'app/components/account/profile/profile.html'
    };

    angular
        .module('hiraApp')
        .component('accountProfileComponent', AccountProfileComponent);

})());