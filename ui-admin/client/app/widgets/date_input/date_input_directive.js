/**
 * Created by daniel on 5/3/17.
 */
((function () {

    'use strict';

    function dateInput() {
        function link(scope) {
            if (scope.ngModel) {
                scope.ngModel = new Date(scope.ngModel);
            }
        }

        var directive = {
            restrict: 'A',
            scope: {
                ngModel: '='
            },
            link: link
        };

        return directive;
    }

    angular.module('hiraApp.widgets')
        .directive('dateInput', dateInput);

})());
