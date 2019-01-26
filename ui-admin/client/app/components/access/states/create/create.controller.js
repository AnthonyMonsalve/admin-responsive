((function () {

    'use strict';

    /*@ngInject*/
    function StatesCreateCtrl(common,StatesSvc,NotificationsSvc) {
        var vm = this;

        var $state = common.$state;

        vm.state = {};
        vm.validationErrors = [];
        vm.serverError = "";

        /*PRIVATE FUNCTIONS*/
        function activate() {
        }

        /*DEFINITION OF VARIABLES*/
        activate();

        function createState(form,state) {
            if (form.$valid) {
                StatesSvc.createState(state)
                    .then(function(){
                       NotificationsSvc.fast("Successfully created","success",2000);
                       $state.go('content.access.states.list');
                       vm.validationErrors = [];
                       vm.state = {};
                    })
                    .catch(function(err){
                        if (err.status == '400') {
                            vm.validationErrors = err.data;
                            return;
                        }

                        if (err.status == '500') {
                            vm.serverError = 'Error creating state.';
                            return;
                        }
                    });
            } else {
              NotificationsSvc.fast("Bad data in form","error");
            }
        }

        vm.createState = createState;
    }

    angular.module('hiraApp')
        .controller('StatesCreateCtrl', StatesCreateCtrl);

})());
