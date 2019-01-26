((function () {

    'use strict';

    /*@ngInject*/
    function ActionsCreateCtrl(common,ActionsSvc,NotificationsSvc) {
        var vm = this;

        var $state = common.$state;

        vm.action = {};
        vm.validationErrors = [];
        vm.serverError = "";

        /*PRIVATE FUNCTIONS*/
        function activate() {
        }

        /*DEFINITION OF VARIABLES*/
        activate();

        function createAction(form,action) {
            if (form.$valid) {
                ActionsSvc.createAction(action)
                    .then(function(){
                       NotificationsSvc.fast("Successfully created","success",2000);
                       $state.go('content.access.actions.list');
                       vm.validationErrors = [];
                       vm.action = {};
                    })
                    .catch(function(err){
                        if (err.status == '400') {
                            vm.validationErrors = err.data;
                            return;
                        }

                        if (err.status == '500') {
                            vm.serverError = 'Error creating action.';
                            return;
                        }
                    });
            } else {
              NotificationsSvc.fast("Bad data in form","error");
            }
        }

        vm.createAction = createAction;
    }

    angular.module('hiraApp')
        .controller('ActionsCreateCtrl', ActionsCreateCtrl);

})());
