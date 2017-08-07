/**
 * Created by yar on 3/22/2016.
 */
(function (angular) {
	'use strict';

	angular.module('App.userInfo').factory('userInfoHttpService',
		[
			'$http',
			function ($http) {
				var service = {};

				service.savePhoto = function () {
					return $http.post();
				};

				service.saveUser = function (format) {
					return $http.post(globals.server + '/user/set', format);
				};

				service.getUserInfo=function(){
					return $http.get(globals.server + '/services/login/getuserinfo');
				};

				return service;
			}]);
})(angular);