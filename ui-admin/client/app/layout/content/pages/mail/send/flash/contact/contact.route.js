((function() {
    'use strict';

    function getStates() {
        return [{
            name: 'content.mail.send.flash.contact',
            config: {
                url: '/contacts?:contactList',
                views: {
                    '@content.mail.send.flash': {
                        templateUrl: 'app/layout/content/pages/mail/send/flash/contact/contact.html',
                        controller: 'MailSendFlashContactCtrl',
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
