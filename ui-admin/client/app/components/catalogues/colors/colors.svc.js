/**
 * Created by daniel on 1/18/17.
 */

((function() {
    'use strict';

    /*@ngInject*/
    function ColorsSvc() {
        var colors = [
            "#f1c40f",
            "#e11341",
            '#663399',
            '#D2527F',
            '#22A7F0',
            '#019875',
            '#D35400',
            '#34495E',
            '#F1A9A0',
            '#87D37C'

        ];

        function getColors() {
            return colors;
        }

        var service = {
            getColors: getColors
        };

        return service;
    }

    angular
        .module('hiraApp')
        .factory('ColorsSvc', ColorsSvc);
})());
