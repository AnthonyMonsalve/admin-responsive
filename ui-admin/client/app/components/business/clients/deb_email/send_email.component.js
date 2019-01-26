((function() {
    'use strict';

    var ClientSendEmailComponent = {
        bindings: { to: '<' , username:'<'},
        controller: 'DebSendEmailCtrl',
        controllerAs: 'vm',
        templateUrl: 'app/components/business/clients/deb_email/send_email.html'
    };

    angular
        .module('hiraApp')
        .component('debSendEmailComponent', ClientSendEmailComponent);

})());