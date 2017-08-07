(function (moment, accounting, math) {
	'use strict';

	angular.module('platform', []);
	//angular.module('platform-helper', []);

	/**
	 * Generates a GUID string.
	 * @returns {String} The generated GUID.
	 * @example af8a84166e18a307bd9cf2c947bbb3aa or af8a8416-6e18-a307-bd9c-f2c947bbb3aa (long = true)
	 * @author Slavik Meltser (slavik@meltser.info).
	 * @link http://slavik.meltser.info/?p=142
	 */
	var uuidGenerator = function uuidGenerator(long) {
		function _p8(s) {
			var p = (Math.random().toString(16) + '000000000').substr(2, 8);

			return s ? '-' + p.substr(0, 4) + '-' + p.substr(4, 4) : p;
		}

		if (long) {
			return _p8() + _p8(true) + _p8(true) + _p8();
		} else {
			return _p8() + _p8() + _p8() + _p8();
		}
	};

	//value can edit
	// uuid generator helper
	angular.module('platform').value('platformCreateUuid', uuidGenerator);
	// globals, underscore, moment, accounting libraries as constant
	// constant can't edit
	angular.module('platform').constant('globals', globals);       // globals
	angular.module('platform').constant('_', _);                   // lodash
	angular.module('platform').constant('moment', moment);         //time com
	angular.module('platform').constant('accounting', accounting); // number format
	angular.module('platform').constant('math', math);             // math function
	angular.module('platform').constant('$', $);                   // jquery
})(moment, accounting, math);
