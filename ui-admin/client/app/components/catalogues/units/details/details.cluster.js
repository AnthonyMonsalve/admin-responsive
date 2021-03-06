/**
 * Created by daniel on 1/18/17.
 */

((function() {
    'use strict';

    /*@ngInject*/
    function UnitDetailsCluster(ClusterFactory) {
        var cluster = new ClusterFactory(5);

        function getCluster() {
            return cluster;
        }

        //API
        var service = {
            getCluster: getCluster
        };

        return service;
    }

    angular
        .module('hiraApp')
        .factory('UnitDetailsCluster', UnitDetailsCluster);
})());
