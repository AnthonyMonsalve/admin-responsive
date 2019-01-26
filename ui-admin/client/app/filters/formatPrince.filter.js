/**
	Created by Andrés Guerrero
	02/12/2017 (mm/dd/aaaa)

	El splice usado aquí no viene por defecto e javascript (ya que
	la variable a trabajar es tipo String). Se extrendió el prototype
	con la siguiente función.

	String.prototype.splice = function(idx, rem, str) {
      return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
    };

    De no tener esto, el presente filtro no funcionará adecuadamente.

**/
((function(){

	'use strict';

	/* @ngInject */
	function money() {
	    return function(value) {
	    	
	    	var number = String(value),
	    		numberOfDots = Math.floor(number.length / 3),
				rem = number.length % 3,
	    		extraLength = 0;

			if (rem === 0) {
				numberOfDots -= 1;
			}

	    	for (var i in _.range(numberOfDots) ) {
	    		number = number.splice(-3*(Number(i)+1) - extraLength,0,".");
	    		extraLength += 1;
	    	}
	    	return number;
	    }
	}

	 angular
	 	.module('hiraApp.filters')
	 	.filter('money', money); 

})());

((function(){

	'use strict';

	/* @ngInject */
	function frequency() {
		return function(frequency) {
			var text = "Every ";
			if (frequency === 12) {
				text += " month";
			} else if (frequency === 1) {
				text += " year";
			} else {
				text += parseInt(12/frequency) + " months";
			}
			return text;
		}
	}

	angular
		.module('hiraApp.filters')
		.filter('frequency', frequency);

})());

((function(){

	'use strict';

	/* @ngInject */
	function term() {
		return function(term) {
			var text = "for " + parseInt(term);
			if (term === 1) {
				text += " month.";
			} else {
				text += " months.";
			}
			return text;
		}
	}

	angular
		.module('hiraApp.filters')
		.filter('term', term);

})());


((function(){

	'use strict';

	/* @ngInject */
	function dateCustom() {
	    return function(value) {
	    	var res = new Date(value)
	    	
	    	return res;
	    }
	}

	 angular
	 	.module('hiraApp.filters')
	 	.filter('dateCustom', dateCustom); 

})());




