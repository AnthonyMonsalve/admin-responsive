/**
 * Created by daniel on 1/18/17.
 */

((function() {
    'use strict';

    /*@ngInject*/
    function NotificationsSvc(common, $mdToast) {

        // Available templates to choose
        var data = {
                      'default' : {
                          'ctrl': 'ToastDefaultCtrl',
                          'template':  'app/blocks/notifications/templates/default/default.template.html'
                       }
                    }

        // Available fast toast config
        var custom = {
                      'success': {
                          "data" : {
                              "status": "success",
                              "icon": "done"
                            }
                        },
                        'error': {
                            "data" : {
                                "status": "error",
                                "icon": "error_outline"
                              }
                          },
                        'warning': {
                            "data" : {
                                "status": "warning",
                                "icon": "warning"
                              }
                          }
                      }

        // options.data is biding to the toast controller. Put all data
        // you want to pass to toast message in there.
        function send(options) {
          var type = options.type || 'default';

          $mdToast.show({
            hideDelay   : options.delay || 3000,
            position    : options.position || 'top right',
            controller  : data[type].ctrl,
            templateUrl : data[type].template,
            bindToController: true,
            controllerAs: "vm",
            locals: {data: options.data}
          });
        }

        // Rapid custom toast
        function fast(message,type,delay) {
          var options = custom[type];

          options.data.message = message;

          if (delay) {
            options.delay = delay;
          }

          send(options);
        }



        var service = {
            send: send,
            fast: fast
        };

        return service;
    }

    angular
        .module('hiraApp')
        .factory('NotificationsSvc', NotificationsSvc);
})());
