/**
 * Created by hot on 2016-6-15.
 */

/**
 *      First config block for ui-router.
 */

//todo: it seems useless
angular.module('platform').factory('platformErrorHttpInterceptor', errorHttpInterceptor);
errorHttpInterceptor.$inject = ['$q', 'globals', '$injector'];
function errorHttpInterceptor($q, globals, $injector) {

	'use strict';
	var service = {};

	/**
	 * This function handles error messages force by the backend server.
	 * The error will be forwarded as Platform message 'onHttpError' containing error data
	 * @param rejection
	 * @returns {Promise}
	 */
	function responseError(rejection) {
		if (rejection.status !== 401) {  // authentication error handle by autothentication library

			// supress fire error event for i18n json files
			if (rejection && rejection.config && rejection.config.url) {
				if (rejection.config.url.indexOf('/i18n/') === -1) {
					if (rejection.config.headers.errorDialog === undefined || rejection.config.headers.errorDialog === true) {
						service.onHttpError.fire('platform.$http.error', rejection);
					}
				} else {
					var match = rejection.config.url.match(/(.+i18n\/.{2,3})-.{2,3}\.json$/);

					if (match) {
						rejection.config.url = match[1] + '.json';

						return $injector.get('$http')(rejection.config);
					} else {
						return $injector.get('$http').get(globals.appBaseUrl + 'common/content/i18n/empty.json');
					}
				}
			}
		}

		return $q.reject(rejection);
	}

	service.onHttpError = new Platform.Messenger(); // jshint ignore:line
	service.responseError = responseError;

	return service;
}


/**
 * register $http interceptor
 */
angular.module('platform').config(['$httpProvider', function ($httpProvider) {
	'use strict';
	var httpInterceptor = 'platformErrorHttpInterceptor';
	$httpProvider.interceptors.push(httpInterceptor);
	// console.log('Error Interceptor ' + httpInterceptor + ' registered.');
}

]);

