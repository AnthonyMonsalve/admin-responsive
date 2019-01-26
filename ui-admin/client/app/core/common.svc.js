((function () {
    'use strict';

    /* @ngInject */
    function common($location, $compile, $q, $rootScope, $timeout, $http, $state, $stateParams, $window, $log) {
        var service = {};

        service.$broadcast = function () {
            return $rootScope.$broadcast.apply($rootScope, arguments);
        };

        service.isNumber = function (val) {
            // negative or positive
            return (/^[-]?\d+$/).test(val);
        };

        service.textContains = function (text, searchText) {
            return text && -1 !== text.toLowerCase().indexOf(searchText.toLowerCase());
        };

        service.findDiff= function findDiff(original, edited){
            var diff = {};
            console.log(original);
            for(var key in edited){
                if ((!original[key] || !angular.equals(original[key], edited[key])) && original[key] != 0) {
                    diff[key] = edited[key];
                }

                if(original[key] == 0 && !angular.equals(original[key], edited[key])){
                    diff[key] = edited[key];
                }
            }
            return diff;
        };

        service.byString = function(object, string) {
            string = string.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
            string = string.replace(/^\./, '');           // strip a leading dot
            var array = string.split('.');
            for (var i = 0, n = array.length; i < n; ++i) {
                var k = array[i];
                if (k in object) {
                    object = object[k];
                } else {
                    return;
                }
            }
            return object;
        };

        service.flatten = function(data) {
            var result = {};
            function recurse (cur, prop) {
                if (Object(cur) !== cur) {
                    result[prop] = cur;
                } else if (Array.isArray(cur)) {
                    for(var i=0, l=cur.length; i<l; i++)
                        recurse(cur[i], prop + "[" + i + "]");
                    if (l == 0)
                        result[prop] = [];
                } else {
                    if (service.isDate(cur)) {
                        result[prop] = cur;
                    } else {
                        for (var p in cur) {
                            recurse(cur[p], prop ? prop+"."+p : p);
                        }
                    }
                }
            }
            recurse(data, "");
            return result;
        };

        service.isDate = function(date) {
            return Object.prototype.toString.call(date) === '[object Date]'
        };

        service.toggleAddArray = function (array, item) {
            var index = array.indexOf(item);

            if (index >= 0) {
                array.splice(index, 1);
            } else {
                array.push(item);
            }

            return array;
        };

        service.removeFromArray = function (array, item) {
            var index = array.indexOf(item);

            if (index >= 0) {
                array.splice(index, 1);
            }

            return array;
        };

        service.isEmpty = function (obj) {
            var prop;

            for (prop in obj) {
                if (obj.hasOwnProperty(prop)) {
                    return false;
                }
            }

            return true;
        };

        /*jshint -W001 */
        service.$q = $q;
        service.$log = $log;
        service.$compile = $compile;
        service.$state = $state;
        service.$stateParams = $stateParams;
        service.$http = $http;
        service.$timeout = $timeout;
        service.$rootScope = $rootScope;
        service.$location = $location;
        service.$window = $window;

        return service;
    }

    angular
        .module('hiraApp.core')
        .factory('common', common);
})());