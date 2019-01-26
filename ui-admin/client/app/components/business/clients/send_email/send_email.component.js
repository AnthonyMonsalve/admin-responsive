
((function() {
    'use strict';

    var ClientSendEmailComponent = {
        bindings: { to: '<' },
        controller: 'ClientSendEmailCtrl',
        controllerAs: 'vm',
        templateUrl: 'app/components/business/clients/send_email/send_email.html'
    };

    angular
        .module('hiraApp')
        .component('clientSendEmailComponent', ClientSendEmailComponent);

})());