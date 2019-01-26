((function () {

    'use strict';

    /*@ngInject*/
    function CataloguesUnitsDetailsEditCtrl(common) {
        var vm = this;

        var $stateParams = common.$stateParams;

        vm.unitId = $stateParams.unitId;

        /*PRIVATE FUNCTIONS*/
        function activate() {
        }

        /*DEFINITION OF VARIABLES*/
        activate();
    }

    angular.module('hiraApp.layout.content.pages.access')
        .controller('CataloguesUnitsDetailsEditCtrl', CataloguesUnitsDetailsEditCtrl);

})());