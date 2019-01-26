((function() {

    'use strict';

    angular.module('hiraApp.filters', []);

})());


//temporal

((function() {
	String.prototype.splice = function(idx, rem, str) {
      return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
    };
})());