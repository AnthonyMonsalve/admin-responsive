((function () {

    'use strict';

    /*@ngInject*/
    function ResourceDetailsActionsCreateCtrl(ActionsSvc,ResourceDetailsActionsListSvc) {
        var vm = this;

        vm.resourceAction = {};
        vm.validationErrors = [];
        vm.serverError = "";

        /*PRIVATE FUNCTIONS*/
        function activate() {
        }

        /*DEFINITION OF VARIABLES*/
        activate();

        function createResourceAction(form,resourceAction,resourceId) {
            if (form.$valid) {
                resourceAction = {
                    title: resourceAction.title,
                    description: resourceAction.description,
                    resourceId: resourceId
                };

                ActionsSvc.createAction(resourceAction)
                    .then(function(){
                        vm.validationErrors = [];
                        vm.resourceAction = {};
                        vm.state = 'list';
                        ResourceDetailsActionsListSvc.getResourceActionsList(true,resourceId);
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
            }
        }

        vm.createResourceAction = createResourceAction;
    }

    angular.module('hiraApp')
        .controller('ResourceDetailsActionsCreateCtrl', ResourceDetailsActionsCreateCtrl);

})());
