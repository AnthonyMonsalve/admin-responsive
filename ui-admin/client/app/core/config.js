((function () {

    'use strict';
    var regexIso8601 = /^(\d{4}|\+\d{6})(?:-(\d{2})(?:-(\d{2})(?:T(\d{2}):(\d{2}):(\d{2})\.(\d{1,})(Z|([\-+])(\d{2}):(\d{2}))?)?)?)?$/;

    function convertDateStringsToDates(input) {
        // Ignore things that aren't objects.
        if (typeof input !== "object") return input;

        for (var key in input) {
            if (!input.hasOwnProperty(key)) continue;

            var value = input[key];
            var match;
            // Check for string properties which look like dates.
            if (typeof value === "string" && (match = value.match(regexIso8601))) {
                var milliseconds = Date.parse(match[0])
                if (!isNaN(milliseconds)) {
                    input[key] = new Date(milliseconds);
                }
            } else if (typeof value === "object") {
                // Recurse into object
                convertDateStringsToDates(value);
            }
        }
    }

    /* @ngInject */
    function configure($stateProvider, $urlRouterProvider, $locationProvider,
            $httpProvider, statehelperConfigProvider, localStorageServiceProvider) {

        function configureRouting() {
            //HTML5 Mode and interceptors, CROSS Domain
            $locationProvider.html5Mode(true);
            localStorageServiceProvider.setPrefix('seed.');
            $httpProvider.interceptors.push('authInterceptor');

            $httpProvider.defaults.transformResponse.push(function(responseData){
                convertDateStringsToDates(responseData);
                return responseData;
            });

            $httpProvider.defaults.useXDomain = true;

            $httpProvider.defaults.withCredentials = true;

            $httpProvider.defaults.headers.common['Content-Type'] = 'application/json';

            delete $httpProvider.defaults.headers.common['X-Requested-With'];

            // Default states and otherwise
            $urlRouterProvider.otherwise('/');

            // State Configuration
            var stateCfg = statehelperConfigProvider;
            stateCfg.config.$stateProvider = $stateProvider;
            stateCfg.config.docTitle = 'AV Securities';
        }

        configureRouting();
    }

    angular.module('hiraApp.core')
        .config(configure);

})());
