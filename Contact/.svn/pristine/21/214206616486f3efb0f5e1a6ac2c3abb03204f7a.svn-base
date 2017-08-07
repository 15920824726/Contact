/**
 * Created by hot on 2016-6-15.
 */
(function (angular) {
	'use strict';

	angular.module('App.contacts').factory('contactsListHttpService',
		['$http', function ($http) {

			var service = {};

			service.getContactList = function (options) {
				return $http.post(globals.server + '/businesspartner/main/mobility/contactlist',options);
			};



			return service;
		}]);
})(angular);