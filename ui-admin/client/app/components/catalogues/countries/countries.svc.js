/**
 * Created by daniel on 1/18/17.
 */

((function() {
    'use strict';

    /*@ngInject*/
    function CountriesSvc() {
        var countries = [
            'Venezuela',
            'Costa Rica',
            'Perú',
            'Colombia',
            'Ecuador',
            'Mexico',
            'USA'
        ];

        function getCountries() {
            return countries;
        }

        var service = {
            getCountries: getCountries
        };

        return service;
    }

    angular
        .module('hiraApp')
        .factory('CountriesSvc', CountriesSvc);
})());
