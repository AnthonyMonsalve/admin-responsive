/**
 * Created by daniel on 5/3/17.
 */
((function () {

    'use strict';

    function keyDetect($document,$rootScope) {
        function link(scope,element) {
            var keys = {
                "left" : 37,
                "up": 38,
                "right": 39,
                "down": 40
            }

	        $document.bind("keydown keypress", function (event) {
                if (event.which == 16) {
                    // otra es scope.$emit , evaluar implicaciones luego
                    $rootScope.$broadcast('ShiftPressed', { code: "Ok" } );
                } else if ((event.which == keys.left) || (event.which == keys.up) || (event.which == keys.right) || (event.which == keys.down)) {
                    var direcction = _.findKey(keys, _.partial(_.isEqual,event.which));
                    $rootScope.$broadcast('ArrowPressed', { dir: direcction } );                    
                }
	        });
            $document.bind("keyup keypress", function (event) {
                if (event.which == 16) {
                    // otra es scope.$emit , evaluar implicaciones luego
                    $rootScope.$broadcast('ShiftRelease', { code: "Ok" } );
                }
            });            
        }

        var directive = {
            restrict: 'A',
            scope: {
            },
            link: link
        };

        return directive;
    }

    angular.module('hiraApp.widgets')
        .directive('keyDetect', keyDetect);

})());
