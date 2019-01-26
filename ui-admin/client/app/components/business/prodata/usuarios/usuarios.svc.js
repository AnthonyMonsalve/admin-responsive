
((function() {
    'use strict';

    /*@ngInject*/
    function diarioListSvc(FilterFactory) {
        var filter = new FilterFactory();

        function getFilter() {
            return filter;
        }

        var service = {
            getFilter: getFilter,
        };

        return service;
    }

    angular
        .module('hiraApp')
        .factory('usuariosListSvc', diarioListSvc);
})());