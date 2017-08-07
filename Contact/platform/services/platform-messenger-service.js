(function (angular, $) {
	'use strict';

	$.extend(true, window, {
		'Platform': {
			'Messenger': Messenger
		}
	});

	angular.module('platform').constant('PlatformMessenger', Messenger);

	function Messenger() {
		var handlers = [];

		/**
		 *
		 */
		this.register = function (fn) {
			handlers.push(fn);
		};
		/**
		 *
		 */
		this.unregister = function (fn) {
			for (var i = 0; i < handlers.length; i++) {
				if (handlers[i] === fn) {
					handlers.splice(i, 1);
				}
			}
		};
		/**
		 *
		 */
		this.fire = function (e, args, scope) {
			var returnValue;
			scope = scope || this;
			for (var i = 0; i < handlers.length; i++) {
				if (_.isFunction(handlers[i])) {
					returnValue = handlers[i].call(scope, e, args);
				}
			}
			return returnValue;
		};
	}

})(angular, $);
