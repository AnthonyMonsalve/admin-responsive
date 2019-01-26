((function() {
    'use strict';

    function getStates() {
        return [{
            name: 'content.mail.send.ac.contact',
            config: {
                url: '/contacts?:contactList',
                views: {
                    '@content.mail.send.ac': {
                        templateUrl: 'app/layout/content/pages/mail/send/AC/contact/contact.html',
                        controller: 'MailSendACContactsCtrl',
                        controllerAs: 'vm'
                    }
                },
                title: 'List of contacts'
            }
        }];
    }

    /* @ngInject */
    function stateConfig(statehelper) {
        statehelper.configureStates(getStates());
    }

    angular
        .module('hiraApp.layout.content.pages.mail')
        .run(stateConfig);

})());
