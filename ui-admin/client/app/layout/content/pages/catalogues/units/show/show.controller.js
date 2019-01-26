((function () {

    'use strict';

    /*@ngInject*/
    function CataloguesUnitsShowCtrl(common) {
        var vm = this;

        var $stateParams = common.$stateParams;

        vm.unitId = $stateParams.unitId;

        /*PRIVATE FUNCTIONS*/
        function activate() {
        }

        /*DEFINITION OF VARIABLES*/
        activate();
    }

    angular.module('hiraApp.layout.content.pages.catalogues')
        .controller('CataloguesUnitsShowCtrl', CataloguesUnitsShowCtrl);

})());