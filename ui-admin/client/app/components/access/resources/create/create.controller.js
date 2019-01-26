((function () {

    'use strict';

    /*@ngInject*/
    function ResourcesCreateCtrl(common,ResourcesSvc,NotificationsSvc) {
        var vm = this;

        var $state = common.$state;

        vm.resource = {};
        vm.validationErrors = [];
        vm.serverError = "";

        /*PRIVATE FUNCTIONS*/
        function activate() {
        }

        /*DEFINITION OF VARIABLES*/
        activate();

        function createResource(form,resource) {
            if (form.$valid) {
                ResourcesSvc.createResource(resource)
                    .then(function(){
                        vm.validationErrors = [];
                        vm.resource = {};
                        NotificationsSvc.fast("Successfully created","success");
                        $state.go('content.access.resources.list');
                    })
                    .catch(function(err){
                        if (err.status == '400') {
                            vm.validationErrors = err.data;
                            return;
                        }

                        if (err.status == '500') {
                            vm.serverError = 'Error creating resource.';
                            return;
                        }
                    });
            } else {
              NotificationsSvc.fast("Bad data in form","error");
            }
        }

        vm.createResource = createResource;
    }

    angular.module('hiraApp')
        .controller('ResourcesCreateCtrl', ResourcesCreateCtrl);

})());
