((function () {

    'use strict';

    angular.module('hiraApp.core', [
        // Angular dependencies
        'ngCookies', 'ngResource', 'ngSanitize', 'ngMaterial',
        // hiraApp blocks maid by us
        'blocks.stateManager',
        // 3rd party dependencies
        'ui.router', 'ngAnimate', 'ui.calendar',
        'ngStorage', 'LocalStorageModule',
        'oitozero.ngSweetAlert', 'md.data.table',
        'angularMoment', 'ui.bootstrap.contextMenu',
        'ui.bootstrap',

        // ng file upload
        'ngFileUpload',

        // text-angular
        'textAngular'
    ]);

})());
