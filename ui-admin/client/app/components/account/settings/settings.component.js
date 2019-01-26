((function() {
    'use strict';

    var AccountSettingsComponent = {
        controller: 'AccountSettingsCtrl',
        controllerAs: 'vm',
        templateUrl: 'app/components/account/settings/settings.html'
    };

    angular
        .module('hiraApp')
        .component('accountSettingsComponent', AccountSettingsComponent);

})());